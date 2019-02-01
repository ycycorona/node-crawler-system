export interface IAxiosOpts {
  timeout?: number
  headers?: object
  httpAgent?: any
  httpsAgent?: any
  interceptors?: (() => void)[]
}

export interface mapType {
  [propName: string]: any
}

export interface domMapType extends mapType{
  [propName: string]: string | {selector: string; contextName?: string}
}
