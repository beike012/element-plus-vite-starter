/**
 * api写法demo
*/
import { ApiResponseResultType } from '@/apis/types/response'
import { CustomerAxiosOptionsInterface } from '@/types/axios'
import { AxiosResponse } from 'axios'
import { get, post, upload, request } from '../request'
import { GetDemo, PostDemo, requestDemo } from '../types/test'

/**
   * get demo 注意此处options是可选参数，通常我们是不用的，只有需要特殊混入axios options时才需要
   * @param params
   * @param options
  * @returns {Promise<AxiosResponse>}
   */
export const getTest = (params: GetDemo, options: CustomerAxiosOptionsInterface): Promise<AxiosResponse> => {
  return get('/api/xxxx', params, options)
}
/**
   * get demo 注意此处options是可选参数，通常我们是不用的，只有需要特殊混入axios options时才需要
   * @param data
   * @param options
   * @returns {Promise<AxiosResponse>}
   */
export const postTest = (data: PostDemo, options: CustomerAxiosOptionsInterface): Promise<AxiosResponse> => {
  return post('/api/xxxx', data, options)
}
/**
   * 上传demo 注意此处options是可选参数，通常我们是不用的，只有需要特殊混入axios options时才需要
   * @param file {File} 需要上传的file
   * @param options
   * @returns {Promise<AxiosResponse>}
   */
export const Upload = (file: File, options: CustomerAxiosOptionsInterface): Promise<AxiosResponse> => {
  // 构建formdata
  const form = new FormData()
  form.append('file', file)
  const axiosRequestConfig = {
    data: form
  }
  return upload('/api/xxxxx', axiosRequestConfig, options)
}
/**
   * request 使用demo 注意此处options是可选参数，通常我们是不用的，只有需要特殊混入axios options时才需要
   * @param {requestDemo} data
   * @param {CustomerAxiosOptionsInterface} options
   * @returns {Promise<AxiosResponse>}
   */
export const demoRequest = (data: requestDemo, options: CustomerAxiosOptionsInterface): Promise<AxiosResponse> => {
  return request({
    url: '/api/xxxx',
    method: 'PUT',
    data,
    baseUrl: 'http://localhost:9000'
  }, options)
}
