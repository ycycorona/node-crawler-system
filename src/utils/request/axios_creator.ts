import * as _config from 'config'
import axios, {AxiosInstance} from 'axios'
import {IAxiosOpts} from 'common/interface'
const config: any = _config

export default(options?: IAxiosOpts): AxiosInstance => {
  const axiosOpts: IAxiosOpts = {}
  axiosOpts.timeout = options.timeout || 50000
  axiosOpts.headers = options.headers || {}

  if (config.axios && config.axios.useProxy) {
    const ProxyAgent = require('proxy-agent');
    const proxyHost = config.axios.proxyHost
    const proxyPort = config.axios.proxyPort;
    const proxyProtocol = config.axios.proxyProtocol
    const proxyOptions = `${proxyProtocol}://${proxyHost}:${proxyPort}`;
    axiosOpts.httpAgent = new ProxyAgent(proxyOptions);
    axiosOpts.httpsAgent = new ProxyAgent(proxyOptions);
  }

  const axiosInstance = axios.create(axiosOpts)

  if (options.interceptors instanceof Array && options.interceptors.length > 0) {
    const interceptors = options.interceptors
    for (const inter of interceptors) {
      inter.call(axiosInstance)
    }
  }
  return axiosInstance;
}
