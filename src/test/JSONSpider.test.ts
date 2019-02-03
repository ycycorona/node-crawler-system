import JSONSpider from 'source/spider/web/JSONSpider'
import * as assert from "assert";

const testUrl = 'http://api.k780.com/?app=weather.future&weaid=1&&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json'

describe('HTMLSpider', function() {
  it('run', function(done) {
    const testSpider = new JSONSpider('AJSONSpider')

    testSpider.parse =
      async function (extractedData: {[propName: string]: any}): Promise<any> {
        return extractedData
      }
    testSpider.setRequest(testUrl)
    testSpider.run()
      .then(data => {
        console.log(data, testSpider)
        assert.ok(data, 'json数据')
        done()
      })
      .catch(error => {
        done(error)
      })
  })
})


