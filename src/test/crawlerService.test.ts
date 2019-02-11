import CrawlerService from '../service/CrawlerService'
import CrawlerScheduler from '../source/crawler/CrawlerScheduler'

// 爬虫调度器实例化
const crawlerScheduler: CrawlerScheduler = new CrawlerScheduler()

// 爬虫服务器实例化
const service = new CrawlerService(crawlerScheduler)

service.run()
.then((...args: any) => {
  console.log(args)
})
