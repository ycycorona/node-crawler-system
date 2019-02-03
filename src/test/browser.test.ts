import getBrowser from 'utils/browser/get_browser'
import * as assert from "assert"
import * as _config from 'config'
import Logger from 'utils/logger'
const logger = Logger(__filename)
const config: any = _config

const testUrl = 'http://api.k780.com/?app=weather.future&weaid=1&&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json'

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


