/**
 * base interface
 */

/**
 * 分页结基础函数
 */
export interface IBasePageResult<T> {
  records: T[]
  total: number
  size: number
  current: number
  hitCount: number
  searchCount: number
  pages: number
}

/**
 * 列表通用字段
 */
export type PageListCommon = {
  updateDate: string
  createDate: string
  updateBy: string
  createBy: string
}
/**
 * 通用列表项状态
 */
export type PageListPageInfo = {
  /* 当前页码 */
  current: number
  /* 分页容量 */
  size: number
}
/**
 * 字典配置项
 */
export type TConfigItem = {
  id: number
  parentId: number
  dictKey: string
  dictValue: string
  dictLabel: string
  keyPath: string
  parentKeyPath: string
  remark: string
  sort: number
  children?: TConfigItem[]
}
