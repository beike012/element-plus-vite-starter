/**
 * 封装axios 请求拦截和响应拦截
 */
import Axios, { AxiosError, AxiosInstance, AxiosResponse, AxiosPromise } from 'axios'
import { AxiosRequestConfigInterface, PendingType } from '@/types/axios'
import { ElLoading, ElMessage } from 'element-plus'
import Config from '@/config/axios'
import { responseStatusError } from './axiosErrorHandler'
import { ApiResponseResultType } from '../types/response'
import { store } from '@/utils';
const TOKEN_NAME = import.meta.env.VITE_TOKEN_NAME
let loadingInstance: any
// 取消重复请求
const pending: Array<PendingType> = []
const CancelToken = Axios.CancelToken
const RETRY_DELAY = 1000
let RETRY_COUNT = 0

// 移除重复请求
const removePending = (config: AxiosRequestConfigInterface) => {
  for (const key in pending) {
    const item: number = +key
    const list: PendingType = pending[key]
    // 当前请求在数组中存在时执行函数体 判断条件是所有的参数、方法、地址都一样，如果加了随机参数，此处无作用
    if (list.url === config.url &&
      list.method === config.method &&
      JSON.stringify(list.params) === JSON.stringify(config.params) &&
      JSON.stringify(list.data) === JSON.stringify(config.data)
    ) {
      // 执行取消操作
      list.cancel('操作太频繁，请稍后再试')
      // 从数组中移除记录
      pending.splice(item, 1)
    }
  }
}

/**
 * axios 请求拦截
 * @param axiosRequestConfig
 */
const axiosRequestInterceptor = (axiosRequestConfig: AxiosRequestConfigInterface): AxiosRequestConfigInterface => {
  // 此处可以添加全局的loading
if (axiosRequestConfig.showLoading) {
  loadingInstance = ElLoading.service({text: '加载中...'})
}
  const token: string = store.get(TOKEN_NAME) || ''

  // 携带登录信息
  if (token) {
    axiosRequestConfig.headers![TOKEN_NAME] = token
  }

  axiosRequestConfig.headers!.sourceType = Config.sourceType

  return axiosRequestConfig
}

/**
 * axios 响应拦截
 * @param axiosResponse
 */
const axiosResponseInterceptor = (axiosResponse: AxiosResponse<ApiResponseResultType>): (AxiosResponse | Promise<AxiosResponse>) => {
  return new Promise((resolve, reject) => {
    // 清除全局提示
    const { data, config } = axiosResponse
    const requestConfig: AxiosRequestConfigInterface = config as AxiosRequestConfigInterface
    if (requestConfig.showLoading) {
      loadingInstance?.close()
    }
    if (requestConfig.isDownLoad) {
      const content = axiosResponse.request.response
      if (!content) {
        ElMessage.error('下载失败')
        reject(data)
        return false
      }
      resolve(content)
      return false
    }
    let { message } = data
    const code = +data.code
    if (requestConfig.showMessage) ElMessage.success(data.message)
    // 状态码验证
    if (!data || code === undefined) {
      // TODO 业务范围异常状态处理
      requestConfig.showMessage && ElMessage.success(data.message)
      reject(axiosResponse)
      return false
    }

    message = message && message.replace(/\n/g, '<br />')
    if (message && message.includes('token')) {
      message = '登录信息失效，请重新登录!'
    }
    const hostName = window.location.href.split(window.location.hash)[0]
    // 登录失效 或者 用户失效
    if (code === 401 || code === 402 || code === 5005005) {
      ElMessage.warning(message)
      window.location.href = hostName + '#/login'
      return Promise.reject(data)
    } else if (code === 5005004) {
      window.location.href = hostName + '#/401'
    } else if (code !== 0) {
      ElMessage.warning(message)
      return Promise.reject(data)
    }

    // 重试次数
    RETRY_COUNT = 0
    // 返回数据
    return resolve(data.data)
  })
}

/**
 * axios response错误处理
 * @param error
 * @param axiosInstance
 */
const axiosResponseErrorHandler = async function axiosResponseErrorHandler(error: AxiosError, axiosInstance: AxiosInstance): (Promise<AxiosResponse | AxiosError>) {
  loadingInstance?.close()
  const response = error.response
  // 超时重新请求
  const config: AxiosRequestConfigInterface = error.config as AxiosRequestConfigInterface
  // 全局的请求次数,请求的间隙
  // const [RETRY_COUNT, RETRY_DELAY] = [5, 1000]

  if (error) {
    // 检查是否已经把重试的总数用完
    if (RETRY_COUNT <= 0) {
      // return Promise.reject(response || { message: error.message })
      return responseStatusError(error)
    }
    // 增加重试计数
    RETRY_COUNT--
    // 创造新的Promise来处理指数后退
    const backoff = (): Promise<AxiosResponse | boolean> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, RETRY_DELAY || 1)
      })
    }
    // instance重试请求的Promise
    return backoff().then((): AxiosPromise => {
      return axiosInstance(config)
    });
  }

  // 根据返回的http状态码做不同的处理
  return responseStatusError(error)
}

/**
 * axios 请求和响应拦截
 * @param AxiosInstance
 */
export const axiosInterceptor = (AxiosInstance: AxiosInstance): AxiosInstance => {
  // http request 拦截器
  AxiosInstance.interceptors.request.use(config => {
    const conf: AxiosRequestConfigInterface = config as AxiosRequestConfigInterface
    return axiosRequestInterceptor(conf)
  }, error => {
    // TODO 此处需要对错误返回统一处理
    return Promise.reject(error)
  })

  // 添加响应拦截器
  AxiosInstance.interceptors.response.use(axiosResponseInterceptor, error => axiosResponseErrorHandler(error, AxiosInstance))
  return AxiosInstance
}
