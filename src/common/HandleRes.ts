export default class HandleRes{
  flag: boolean
  msg: string
  data: any
  error: Error
  errNo: string

  constructor(
    {flag = false, msg = '', data = '', error = null, errNo = ''}:
      { flag?: boolean; msg?: string; data?: any; error?: Error; errNo?: string } =
      {}) {
    this.flag = flag
    this.msg = msg
    this.data = data
    this.error = error
    this.errNo = errNo
  }
}
