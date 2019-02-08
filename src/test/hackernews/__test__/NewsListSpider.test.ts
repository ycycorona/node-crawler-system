import NewsListSpider from "../spider/NewsListSpider"
import * as assert from "assert";
let newsListSpider: NewsListSpider = new NewsListSpider().setRequest(
  "https://news.ycombinator.com/news"
)

describe('NewsListSpider', function() {
  it('run', async function() {
    // 不执行持久化操作
  let stories: Array<any> = await newsListSpider.run(false)
    console.log(newsListSpider)

    assert.ok(stories instanceof Array && stories.length > 0)
    console.log(stories.length)
  })
})
