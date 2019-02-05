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

export interface domMapType extends mapType{
  [key: string]: string | {selector: string; contextName?: string}
}
