import MapHandler from './MapHandler'
import {domMapType} from 'common/interface'
import * as cheerio from 'cheerio'

export type selectorStr = string

export type contextMapType = {
  [propName: string]: selectorStr
}

export default class CheerioMapSelector extends MapHandler{
  // 定义其他小作用域
  private contextMap: contextMapType

  // 已经用文档作为context初始化过的CheerioStatic实例
  readonly $: CheerioStatic

  /**
   *
   * @param {string} docStr - 要解析的html
   * @param {domMapType} map - 名-选择器 map
   * @param {contextMapType} contextMap - 自定义的上下文（选择器）
   * @param {funtion} handler - 提取函数
   */
  constructor(readonly docStr: string,
              map: domMapType,
              contextMap?: contextMapType,
              handler?: ()=>any) {
    super(map, handler)
    this.docStr = docStr
    this.$ = cheerio.load(this.docStr)
    contextMap && (this.contextMap = contextMap)
  }

  /**
   * 批量选择出dom
   * @param {string | {string,string}} mapVal - 选择器（有两种类型）
   */
  protected handler(
    mapVal: string | {selector: string; contextName?: string}) {
    if (typeof mapVal === "string") {
      return this.$(mapVal)
    } else {
      if (!this.contextMap) {throw Error('contextMap未定义，但是使用{selector: string; contextName?: string}格式的mapVal')}
      return this.$(mapVal.selector, this.contextMap[mapVal.contextName])
    }

  }
}
