export interface IAxiosOpts {
  timeout?: number
  headers?: object
  httpAgent?: any
  httpsAgent?: any
  interceptors?: (() => void)[]
}

export type ModelType = {
  [propName: string]: string | ModelType
}
