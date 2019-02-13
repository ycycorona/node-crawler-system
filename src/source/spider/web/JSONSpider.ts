import Spider from '../Spider'
import axios from 'utils/request/simulate-browser-axios'
import {AxiosRequestConfig} from 'axios'
import {mapType} from 'common/interface'
/**
 * desc 简单的基于HTTP的JSON爬虫
 */
export default class JSONSpider extends Spider {
  option: AxiosRequestConfig
  /**
   * Description 数据抓取
   * @param url
   * @param axiosOpts
   * @returns {Promise}
   */
  async fetch(url: string, axiosOpts?: AxiosRequestConfig): Promise<any> {
    const defaultAxiosOpts = {
      url: url,
      method: 'GET'
    }
    return new Promise(async (resolve, reject) => {
      let data: any = await axios(Object.assign(defaultAxiosOpts, axiosOpts))
        .catch(error => {
          reject(error) // 抓取数据失败，此时直接停止spider运行，并抛出错误
        })
      if (data.status !== 200) {
        reject(data)
      }
      // 保证返回的是JSON对象
      resolve(data.data)
    });
  }

  /**
   * 提取数据
   * @param JSONObj
   * @param extractMap
   */
  async extract(JSONObj: object, extractMap: mapType): Promise<{data: object}> {
    return {data: JSONObj}
  }

  async parse(extractedData: {[propName: string]: any} | any[]): Promise<any> {
    return extractedData
  }
}
