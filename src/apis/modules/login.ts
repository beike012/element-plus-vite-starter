/**
 * 登录相关的接口
 */
import { post } from '../request'

export const testSelect = () => {
  return post('/api/Knowledgemap/pcdata/select_year/', {}, { showLoading: true })
}
