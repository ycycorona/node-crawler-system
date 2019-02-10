import HTMLSpider from "./HTMLSpider"
import getBrowser from 'utils/browser/get_browser'
import {Browser, Page} from "puppeteer"
import {domMapType, mapType} from 'common/interface'
import {contextMapType} from "utils/map_selector/CheerioMapSelector"
import Logger from 'utils/logger'
const logger = Logger(__filename)
import HandleRes from 'common/HandleRes'
import {AxiosRequestConfig} from "axios";

export default class puppeteerSpider extends HTMLSpider {

  // 浏览器实例
  browser: Browser

  setBrowser(browser: Browser) {
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

  async fetch(url: string, pageOption?: {timeout?: number}): Promise<any> {
    const defaultPageOptions = {
      timeout: 30000,
      waitUntil: ['domcontentloaded', 'load', 'networkidle0']
    }
    if (pageOption) {pageOption = Object.assign(defaultPageOptions, pageOption)}
    const handleRes = new HandleRes()

    if(!this.browser) {
      this.browser = await this.getNewBrowser()
    }

    const page = await this.browser.newPage().catch(err => {
      logger.error('创建新页面失败', err)
      handleRes.error = err
    })

    if (!page) {throw handleRes.error}

    await page.goto(url, pageOption).catch(err => {
      logger.error(`打开${url}失败`, err)
      handleRes.error = err
    })

    if (handleRes.error) {throw handleRes.error}

    const HTMLStr = await page.mainFrame().content()
    await page.close()
    return HTMLStr
  }
}
