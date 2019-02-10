import NewsCommentSpider from "../spider/NewsCommentSpider"
import * as assert from "assert";
import Spider from "source/spider/Spider";
let newsCommentSpider: NewsCommentSpider = new NewsCommentSpider().setRequest(
  "https://news.ycombinator.com/item", {
    params: {
      id: '19113635'
    }
  }
)
.setExtra({storyId: 19113635})

describe('NewsCommentSpider', function() {
  it('run', async function() {
    // 不执行持久化操作
    let res: any = await newsCommentSpider.run(false)

    assert.ok(res.commentsList instanceof Array && res.commentsList.length > 0)
    console.log(res.commentsList.length)
  })
  it.only('simple test', async function(){
    console.log(newsCommentSpider instanceof NewsCommentSpider)
    console.log(newsCommentSpider instanceof Spider)
  })
})


