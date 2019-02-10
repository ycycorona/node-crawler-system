import getBrowser from 'utils/browser/get_browser'
import PuppeteerSpider from 'source/spider/web/PuppeteerSpider'
import * as assert from "assert"
import * as _config from 'config'
import Logger from 'utils/logger'
const logger = Logger(__filename)
const config: any = _config

const testUrl = 'https://news.ycombinator.com/item?id=19113635'

describe('browser', function() {
  it('run', async function() {
    let flag = true
    const browser = await getBrowser(config.chromeOptions)
    if (browser) {

      const pages = await browser.pages()
      const page = await browser.newPage().catch((err:any) => {
        logger.error('创建新页面失败', err)
        flag = false
      })
    }
  })
})

describe.only('puppeteer', function() {
  it('run', async function() {
    let flag = true
    const browser = await getBrowser(config.chromeOptions)
    if (browser) {
      const puppeteerSpider = await new PuppeteerSpider().setRequest(testUrl).setBrowser(browser)
      puppeteerSpider.parse = async function(extractData, $) {
        return $
      }
      puppeteerSpider.run()
      .then(data => {
        console.log(data)
      })
    }
  })
})


