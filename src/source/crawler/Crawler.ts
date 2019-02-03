import Spider from '../spider/Spider.js'



export type Transformer = (dataFromPreviousSpider: any) => {[propName: string]: any}
export default class Crawler {
  // 当前类名
  name: string = this.constructor.name

  // 用于前端的展示名
  displayName = 'Crawler'

  // 存放所有的爬虫信息
  spiders: Spider[] = []

  // 爬虫连接转化函数列表
  transforms: Transformer[] = [];
}
