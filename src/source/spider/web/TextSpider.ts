import Spider from '../Spider'
import axios from 'utils/request/simulate-browser-axios'
import {AxiosRequestConfig} from 'axios'
import {mapType} from 'common/interface'
import HandleRes from 'common/HandleRes'
/**
 * desc 简单的基于 HTTP 的爬虫
 */
export default class TextSpider extends Spider {
  option: AxiosRequestConfig
  /**
   * Description 数据抓取
   * @param url
   * @param axiosOpts
   * @returns {Promise}
   */
  async fetch(url: string, axiosOpts?: AxiosRequestConfig | object): Promise<string> {
    const defaultAxiosOpts = {
      url: url,
      method: 'GET'
    }
    return new Promise(async (resolve, reject) => {
      const res = new HandleRes()
      let data: any = await axios(Object.assign(defaultAxiosOpts,axiosOpts))
        .catch(error => {
          // 抓取数据失败，此时直接停止spider运行，并抛出错误
          res.error = error
          res.status = 0
        })

      if (res.status === 0) {
        reject(res.error)
        return
      } else {
        if (data.status !== 200) {
          reject(data)
        } else {
          // 保证返回的是字符串
          resolve(typeof data.data === 'string' ? data.data : JSON.stringify(data.data))
        }
      }
    })
  }

  /**
   * 提取数据
   * @param pageHTMLStr
   * @param extractMap
   */
  async extract(pageHTMLStr: string, extractMap: mapType): Promise<{data: string}> {
    return {data: pageHTMLStr}
  }
}
