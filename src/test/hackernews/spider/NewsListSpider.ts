import HTMLSpider from "source/spider/web/HTMLSpider"
export default class NewsListSpider extends HTMLSpider {
  // 定义模型
  extractMap = {
    $newsList: "tr.athing"
  }

  /**
   * @function 默认解析函数
   * @param pageObject
   * @param $
   * @returns {Array}
   */
  async parse(extractedData: {[propName: string]: Cheerio}, $?: CheerioStatic): Promise<any> {
    // 存放全部的抓取到的对象
    const stories: Array<any> = [];
    extractedData.$newsList.each(function() {
      const $title = $(this).find('td.title')
      const $site = $(this).find('td.title span.sitestr')
      stories.push({
        id: $(this).attr("id"),
        title: $title.text(),
        href: $('a', $title).attr("href"),
        site: $site.text(),
        score: $(this).next().find(".score").text().split(" ")[0]
      });
    })
    console.log(stories)
    return stories
  }

  /**
   * Description 校验检测到的数据是否准确
   * @param stories
   */
  async validate(stories: any) {
    return true
  }
}
