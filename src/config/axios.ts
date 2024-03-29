/**
 * axios 配置文件
*/
const dev = import.meta.env.DEV
const BASE_URL = dev ? "/admin" : "/"
export default {
  baseURL: BASE_URL, // Api Host,
  url: '',
  data: {},
  method: 'POST',
  showLoading: true,
  responseType: 'json', // 响应数据类型
  withCredentials: true, // 携带cookie
  timeout: 1000 * 60 * 5, // 超时时间
  sourceType: 'bk' // 用来标记请求应用， 自定义
}
