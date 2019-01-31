import TextSpider from 'source/spider/web/TextSpider'
import * as assert from "assert";

const testUrl = 'https://www.baidu.com'

describe('textSpider', function() {
  it('fetch', function(done) {
    const testSpider = new TextSpider()
    testSpider.fetch(testUrl, {timeout: 10*1000})
      .then(data => {
        assert.strictEqual(!!data, true)
        done()
      })
      .catch(error => {
        done(error)
      })
  })

  it.only('run.success', function(done) {
    const testSpider = new TextSpider()
    testSpider.setRequest(testUrl, {timeout: 10*1000})
    testSpider.run()
      .then(data => {
        assert.strictEqual(!!data.data, true)
        done()
      })
      .catch(error => {
        done(error)
      })
  })

  it.only('run.fail-验证错误时的抛异常操作', function(done) {
    const testSpider = new TextSpider()
    testSpider.setRequest(testUrl.substring(0,-1), {timeout: 10*1000})
    testSpider.run()
      .then(data => {
        //assert.strictEqual(!!data.data, true)
        done(false)
      })
      .catch(error => {
        done()
      })
  })


})


