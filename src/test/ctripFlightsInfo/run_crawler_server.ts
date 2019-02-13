import CrawlerScheduler from "source/crawler/CrawlerScheduler"
import CrawlerServer from "server/CrawlerServer"
import FlightInfoCrawler from "./crawler/FlightInfoCrawler"
const crawlerScheduler: CrawlerScheduler = new CrawlerScheduler();

// 注册
crawlerScheduler.register(new FlightInfoCrawler())

new CrawlerServer(crawlerScheduler).run().then(
  info => {
    console.log(info);
  },
  error => {
    console.error(error);
  }
);
