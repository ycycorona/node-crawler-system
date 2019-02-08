import TextSpider from 'source/spider/web/TextSpider'
import {domMapType} from 'common/interface'
import CheerioMapSelector, {selectorStr, contextMapType} from 'utils/map_selector/CheerioMapSelector'

export default class HTMLSpider extends TextSpider {
  // 定义其他小作用域
  protected contextMap: contextMapType

  /**
   * 构造函数
   * @param contextMap
   * @param extractMap
   * @param displayName
   * @param extra
   */
  constructor(
              displayName: string = 'spider',
              extractMap?: domMapType,
              contextMap?: contextMapType,
              extra?: any) {
    super(displayName, extra)
    extractMap && (this.extractMap = extractMap)
    contextMap && (this.contextMap = contextMap)
  }

  async extract(pageHTMLStr: string, extractMap: domMapType): Promise<{data: any; $?: CheerioStatic}> {
    const cheerioMapSelector = new CheerioMapSelector(pageHTMLStr, extractMap, this.contextMap)
    const extraRes = cheerioMapSelector.run()
    return {data: extraRes, $: cheerioMapSelector.$}
  }

  parse (extractedData: {[propName: string]: Cheerio}, $?: CheerioStatic) : Promise<any> {
    return Promise.resolve()
  }
}
