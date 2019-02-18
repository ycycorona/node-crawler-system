import CrawlerScheduler from "source/crawler/CrawlerScheduler"
import CrawlerServer from "server/CrawlerServer"
import FlightInfoCrawler from "./crawler/FlightInfoCrawler"
import { createConnection, getConnectionManager } from "typeorm"
import Logger from 'utils/logger'
const logger = Logger(__filename)
import * as _config from 'config'
const config: any = _config

;(async () => {
  try {
    await createConnection(config.orm)
    logger.debug('数据库连接已建立')

    const crawlerScheduler: CrawlerScheduler = new CrawlerScheduler()

    // 注册
    crawlerScheduler.register(new FlightInfoCrawler())

    new CrawlerServer(crawlerScheduler).run().then(
      info => {

        //console.log(info);
      },
      error => {
        console.error(error);
      }
    )
  } catch(err) {
    console.log(err)
  }

})()

