import Spider from '../source/spider/Spider'

const testSpider: Spider = new Spider()
testSpider.setRequest('https//:www.baidu.com')
testSpider.run()
.then(data => {
  console.log(data,testSpider)
})
