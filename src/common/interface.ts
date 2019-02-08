export interface IAxiosOpts {
  timeout?: number
  headers?: object
  httpAgent?: any
  httpsAgent?: any
  interceptors?: (() => void)[]
}

export interface mapType {
  [key: string]: any
}

/**
 * @desc 批量dom选择器
 * @param {string} selector - css选择器
 * @param {string} contextName - 已缓存的制定上下文引用变量名
 */
export interface domMapType extends mapType{
  [key: string]: string | {selector: string; contextName?: string}
}
