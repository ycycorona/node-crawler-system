import CrawlerScheduler from "source/crawler/CrawlerScheduler"
import CrawlerServer from "server/CrawlerServer"
import NewsCrawler from "./crawler/NewsCrawler"
const crawlerScheduler: CrawlerScheduler = new CrawlerScheduler();

// 注册
crawlerScheduler.register(new NewsCrawler());

new CrawlerServer(crawlerScheduler).run().then(
  info => {
    console.log(info);
  },
  error => {
    console.error(error);
  }
);
