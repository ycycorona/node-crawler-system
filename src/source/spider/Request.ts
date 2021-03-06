/**
 * Description 通用的请求对象
 */
export default class Request {
  /** 通用请求属性 */
  // 目标
  target?: any

  // 配置
  option?: {
    [x: string]: any
  }

  // 其他额外信息
  extra?: any

  /** Web 专用属性 */
  url?: string

  constructor(url: string, option?: object, extra?: any) {
    url && (this.url = url)
    option && (this.option = option)
    extra && (this.extra = extra)
  }
  /**
 * Description 判断输入的 Request 对象是否有效
 * @param request
 * @return {boolean}
 */
  static isValid: (request: {[x: string]: any} | Request) => boolean =
   function(request: {[x: string]: any} | Request): boolean {
    if (request instanceof Request) {
      return !!request.target
    } else {
      return !!request.url
    }
  }
}

