import Spider from '../spider/Spider'
import Request from '../spider/Request'
import {Transformer} from './Crawler'
import Logger from 'utils/logger'
const logger = Logger(__filename)

export default class SpiderTask {

  /** 当前蜘蛛实例 */
  spiderInstance: Spider

  request: Request

  transformer: Transformer

  /** 下一个蜘蛛实例 */
  nextSpiderInstance: Spider

  /** 内部运行时属性 */
  error: Error

  /** 本任务的执行开始时间 */
  startTime: Date

  /** 本任务的执行消耗时间 */
  elapsedTime: number

    /**
   * 默认构造函数
   */
  constructor(
    spiderInstance: Spider,
    request: Request,
    transformer: Transformer,
    nextSpiderInstance: Spider
  ) {
    this.spiderInstance = spiderInstance

    this.request = request

    this.transformer = transformer

    this.nextSpiderInstance = nextSpiderInstance
  }

  /**
   * @desc 初始化爬虫任务时使用，把spider、request、转换函数、下一个spider组合成一个蜘蛛任务
   * @param requests
   * @param spiders
   * @param transforms
   */
  static initMap(
    requests: Array<Request>,
    spiders: Array<Spider>,
    transforms: Array<Transformer>): Array<SpiderTask> {
      return requests.map(request => {
        return new SpiderTask(
          spiders[0],
          request,
          transforms.length > 0 ? transforms[0] : null,
          spiders.length > 1 ? spiders[1] : null
        )
      })
    }

  /**
   * @desc 执行该任务
   * @return {Promise.<void>}
   */
  async run(isPersist?: boolean): Promise<Array<Request>> {
    const { url, option, extra } = this.request

    // 设置爬虫的请求
    this.spiderInstance.setRequest(url, option)

    // 判断上一次发出的请求中是否附带有额外的 extra 信息
    if (extra) {
      this.spiderInstance.setExtra(extra)
    }

    this.startTime = new Date()

    let data
    let derivedRequests: Array<Request> = []

    try {
      // 执行当前任务
      data = await this.spiderInstance.run(isPersist)

      // 记录本次执行时间
      this.elapsedTime = Date.now() - this.startTime.valueOf()
    } catch (e) {
      // 发生异常时，跳过剩余的执行
      this.error = e
      throw e
    }

    // 设置新的爬虫
    if (this.transformer && this.nextSpiderInstance) {
      // 根据转换器获取新的请求
      let newRequests = this.transformer(data)

      return newRequests.map((rawRequest: Request) => {
        return rawRequest
      })
    } else {
      return []
    }
  }
}
