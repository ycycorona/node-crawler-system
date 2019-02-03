import HTMLSpider from 'source/spider/web/HTMLSpider'
import * as assert from "assert";

const testUrl = 'https://greasyfork.org/zh-CN/scripts/by-site/baidu.com'

describe('HTMLSpider', function() {
  it('extract and parse', function(done) {
    const extractMap = {
      '$scriptTitleList': '#browse-script-list>li>article>h2>a'
    }
    const testSpider = new HTMLSpider('AHTMLSpider', extractMap)

    testSpider.parse =
      async function (extractedData: {[propName: string]: any}, $?: CheerioStatic): Promise<any> {
        const titleList: string[] = []
        extractedData.$scriptTitleList.each(function(index: number) {
          titleList.push($(this).text())
        })
      return titleList
    }

    testSpider.fetch(testUrl, {timeout: 10*1000})
      .then(data => {
        assert.strictEqual(!!data, true)
        testSpider.extract(data, extractMap)
          .then(data => {
            testSpider.parse(data.data, data.$)
              .then(titleList => {
                assert.ok(titleList.length>0, 'title列表有效')
                done()
              })
          })
      })
      .catch(error => {
        done(error)
      })
  })


  it.only('run', function(done) {
    const extractMap = {
      '$scriptTitleList': '#browse-script-list>li>article>h2>a'
    }
    const testSpider = new HTMLSpider('AHTMLSpider', extractMap)

    testSpider.parse =
      async function (extractedData: {[propName: string]: Cheerio}, $?: CheerioStatic): Promise<any> {
        const titleList: string[] = []
        extractedData.$scriptTitleList.each(function(index: number) {
          titleList.push($(this).text())
        })
        return titleList
      }
    testSpider.setRequest(testUrl)
    testSpider.run()
      .then(titleList => {
        console.log(titleList[1])
        assert.ok(titleList.length>0, 'title列表有效')
        done()
      })
      .catch(error => {
        done(error)
      })
  })
})


