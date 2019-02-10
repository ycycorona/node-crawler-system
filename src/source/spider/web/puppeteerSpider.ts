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
              extractMap?: domMapType,
              browser?: Browser,
              contextMap?: contextMapType,
              extra?: any) {
    super(displayName, extractMap, contextMap, extra)
    browser && (this.browser = browser)
  }

  setBrowser(browser: Browser): this {
    browser && (this.browser = browser)
    return this
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

    // 航班信息页面地址
    await page.goto(url, {
      timeout: 30000,
    }).catch(e => {
      logger.error(`打开${url}失败`, e)
      throw e
    })

    const pageDocStr = await page.mainFrame().content()
    return pageDocStr
  }
}
