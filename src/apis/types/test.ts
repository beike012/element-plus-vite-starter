/**
 * 测试接口interface
 */

export interface GetDemo {
  current: number;
  pageSize: number;
  title?: string;
  author?: string;
}

export interface PostDemo {
  id: string;
  title: string;
  content: string;
}

export type requestDemo = PostDemo
