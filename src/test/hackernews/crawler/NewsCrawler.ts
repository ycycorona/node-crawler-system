import {default as Crawler, initialized} from "source/crawler/Crawler"
import NewsListSpider from "../spider/NewsListSpider"
import Request from 'source/spider/Request'
/**
 * Description 新闻爬虫
 */
export default class NewsCrawler extends Crawler {
  @initialized
  initialize() {
    // 构建所有的爬虫
    let requests: Request[] = [{ url: "https://news.ycombinator.com/news"}];

    this.setRequests(requests).setSpider(
      new NewsListSpider()
    )
  }
}
