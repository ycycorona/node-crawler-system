import CrawlerService from '../service/CrawlerService'
import CrawlerScheduler from '../source/crawler/CrawlerScheduler'

const service = new CrawlerService(CrawlerScheduler)

service.run()
.then((...args) => {
  console.log(args)
})
