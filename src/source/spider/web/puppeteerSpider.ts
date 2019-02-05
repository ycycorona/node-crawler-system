import HTMLSpider from "./HTMLSpider"
import getBrowser from 'utils/browser/get_browser'
import {Browser, Page} from "puppeteer"
import {domMapType} from 'common/interface'
import {contextMapType} from "utils/map_selector/CheerioMapSelector"
import Logger from 'utils/logger'
const logger = Logger(__filename)
import HandleRes from 'common/HandleRes'

export default class puppeteerSpider extends HTMLSpider {

  // 浏览器实例
  browser: Browser

  constructor(displayName: string = 'spider',
              extractMap: domMapType,
              browser?: Browser,
              contextMap?: contextMapType,
              extra?: any) {
    super(displayName, extractMap, contextMap, extra)
    browser && (this.browser = browser)
  }

  // 获取新浏览器实例
  async getNewBrowser() {
    let error = null
    const browser = await getBrowser().catch(err => {
      logger.error(err)
      error = err
    })
    if (error) {
      throw error
    } else {
      return <Browser>browser
    }
  }

  async fetch(url: string, option?: any): Promise<any> {
    const handleRes = new HandleRes()

    if(!this.browser) {
      this.browser = await this.getNewBrowser()
    }

    const page = await this.browser.newPage().catch(err => {
      logger.error('创建新页面失败', err)
      handleRes.error = err
    })

    if (!page || handleRes.error) { throw handleRes.error }

    const HTMLStr = await new Promise((resolve, reject) => {
      page.on('response', async (response) => {
        const url = response.url()
        if (url.match(/api\/\w+\/products/)) {
          // 航班信息主数据接口
          if (response.status() === 200) {
            resolve(await response.text())
          } else {
            resolve(null)
            logger.error(`${url}页面json获取失败`)
          }
        } else {

        }
      })
      // 航班信息页面地址
      const url = '11'//`http://flights.ctrip.com/itinerary/oneway/${flightLine[0]}-${flightLine[1]}?date=${date}`
      page.goto(url, {
        timeout: 30000,
      }).catch(e => {
        logger.error(`打开${url}失败`, e)
      })
    })
  }
}
