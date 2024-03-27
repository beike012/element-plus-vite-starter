
// api 接口返回主体接口配置
export interface ApiResponseResultType<T = any> {
  code: number;
  message: string;
  data: T;
}
