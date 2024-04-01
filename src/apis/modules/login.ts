/**
 * 登录相关的接口
 */
import { post } from "../request";
import { ref } from "vue";
export const testSelect =async () => {
  const res=await post<string>('/api/Knowledgemap/pcdata/select_year/', {}, { showLoading: true })
  return ref(res)
};
