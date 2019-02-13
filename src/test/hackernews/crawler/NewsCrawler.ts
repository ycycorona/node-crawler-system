import {default as Crawler, initialized} from "source/crawler/Crawler"
import NewsListSpider from "../spider/NewsListSpider"
import NewsCommentSpider from "../spider/NewsCommentSpider"
import Request from 'source/spider/Request'
/**
 * Description 新闻爬虫
 */
export default class NewsCrawler extends Crawler {
  @initialized
  initialize() {
    // 构建所有的爬虫
    let requests: Request[] = [
      { url: "https://news.ycombinator.com/news" },
      { url: "https://news.ycombinator.com/news" },
      { url: "https://news.ycombinator.com/news" }
    ]

    this
    .setRequests(requests)
    .setSpider(
      new NewsListSpider()
    )
    .setTransform(
      (newsArray: {id: string}[]): Request[] => {
        newsArray = newsArray.slice(0, 4)
        const requestList = newsArray.map(newsItem => {
          return {
            url: `https://news.ycombinator.com/item?id=${newsItem.id}`,
            extra: {
              storyId: newsItem.id
            }
          }
        })
        return requestList
      }
    )
    .setSpider(
      new NewsCommentSpider(), 5
    )
  }
}
