import JSONSpider from "source/spider/web/JSONSpider"
export default class FlightInfoSpider extends JSONSpider {
  /**
   * @function 解析函数
   * @param pageObject
   * @returns {Array}
   */
  async parse(extractedData: {[propName: string]: any}): Promise<any> {
    console.log(extractedData.msg)
    return extractedData
  }

  /**
   * Description 校验检测到的数据是否准确
   * @param stories
   */
  async validate(stories: any) {
    return true
  }
}
