import getBrowser from 'utils/browser/get_browser'
import PuppeteerSpider from 'source/spider/web/PuppeteerSpider'
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

      if (browser) {
        await browser.close()
      }
    }
  })
})

describe.only('puppeteerSpider', function() {
  it('run', async function(done) {
    const testUrl = 'https://flights.ctrip.com/itinerary/oneway/tao-kmg?date=2019-04-13'
    const extractMap = {
      '$direct': '.search_box.search_box_tag.search_box_light.Label_Flight',
      '$transit': '.search_box.search_box_tag.search_box_light.Label_Transit'
    }
    const puppeteerSpider = new PuppeteerSpider('APuppeteerSpider', extractMap)

    puppeteerSpider.setParse(
      async function (extractedData: {[propName: string]: any}, $?: CheerioStatic): Promise<any> {
        const directList: string[] = []
        const transitList: string[] = []
        extractedData.$direct.each(function(index: number) {
          directList.push($(this).find('.logo-item.flight_logo').text())
        })
        extractedData.$transit.each(function(index: number) {
          transitList.push($(this).find('.logo-item.flight_logo').text())
        })
        return {directList, transitList}
      })

    puppeteerSpider.fetch(testUrl)
      .then(data => {
        assert.strictEqual(!!data, true)
        puppeteerSpider.extract(data, extractMap)
          .then(data => {
            puppeteerSpider.parse(data.data, data.$)
              .then((res: {directList: string[], transitList: string[]}) => {
                console.log(res)
                try {
                  assert.ok(res.directList.length + res.transitList.length > 0, 'title列表有效')
                  done()
                } catch (e) {
                  done(e)
                }

              })
          })
      })
      .catch(error => {

      })
  })
})


