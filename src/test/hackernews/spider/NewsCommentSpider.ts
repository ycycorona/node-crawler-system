import HTMLSpider from "source/spider/web/HTMLSpider"
export default class NewsListSpider extends HTMLSpider {
  // 定义模型
  extractMap = {
    $commentsList: ".athing.comtr"
  }

  /**
   * @function 默认解析函数
   * @param pageObject
   * @param $
   * @returns {Array}
   */
  async parse(extractedData: {[propName: string]: Cheerio}, $?: CheerioStatic): Promise<any> {
    // 存放全部的抓取到的对象
    const commentsList: Array<any> = []
    let lastLevel = 0
    extractedData.$commentsList.each(function() {
      const indentWidth = $(this).find('.ind img').attr('width')
      let level = 0
      if (indentWidth && Number(indentWidth)) {
        level = Number(indentWidth) / 40
      }

      commentsList.push({
        commentId: $(this).attr('id'),
        comment: $(this).find('.commtext').text(),
        indent: level
      })
    })
    return {
      commentsList,
      storyId: this.extra.storyId
    }
  }

  /**
   * Description 校验检测到的数据是否准确
   * @param stories
   */
  async validate(stories: any) {
    return true
  }
}
