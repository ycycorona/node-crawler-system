import HTMLSpider from 'source/spider/web/HTMLSpider'
import * as assert from "assert";

const testUrl = 'https://greasyfork.org/zh-CN/scripts/by-site/baidu.com'

describe('HTMLSpider', function() {
  it.only('extract', function(done) {
    const extractMap = {
      'scriptList': '#browse-script-list'
    }
    const testSpider = new HTMLSpider('AHTMLSpider', extractMap)

    testSpider.parse =
      async function (extractedData: {data: any}, $dom?: HTMLElement): Promise<any> {

      return extractedData;
    }

    testSpider.fetch(testUrl, {timeout: 10*1000})
      .then(data => {
        assert.strictEqual(!!data, true)
        testSpider.extract(data, extractMap)
          .then(data => {
            console.log(data)
            done()
          })

      })
      .catch(error => {
        done(error)
      })
  })

})


