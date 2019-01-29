import SpiderInterface from './SpiderInterface'
import nanoid = require("nanoid");

/**
 * Description 蜘蛛中心定义类
 *
 * *Error Handling* 在生产环境下，蜘蛛应该由爬虫统一调度，因此蜘蛛并不需要在本层进行容错，而应该直接抛出异常
 *
 */

export default class Spider implements SpiderInterface {
  // 唯一编号
  readonly uuid: string = nanoid()
  // 当前类名
  readonly name: string = this.constructor.name
  // 模型属性
  model: any

  /**
   * desc 构造函数
   * @param {string} displayName - 爬虫展示名
   */
  constructor(readonly displayName: string) {

  }

  async fetch() {

  }

  async extract() {
    return {}
  }

  async parse() {

  }

  async validate() {
    return true
  }

  async persist() {
    return true
  }

  async run() {
    return true
  }
}
