import Spider from '../spider/Spider'
import Request from '../spider/Request'
import SpiderTask from './SpiderTask'

/**
 * @desc 把上一个蜘蛛的结果转换成下一个蜘蛛的request对象
 *
 */
export type Transformer = (dataFromPreviousSpider: any) => Array<Request>

/**
 * @desc 装饰器：手动指明初始化状态，无论spiders、transforms、requests都存在变量
 * @param target
 * @param propertyKey
 * @param descriptor
 */
export function initialized(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  let func = descriptor.value // 先获取之前的函数
  // 修改对应的value
  descriptor.value = function (...args: any) {
    try {
      const resValue = func.apply(this, args)
      this._isManualInit = true
      return resValue
    } catch (e) {
      console.log(e)
    }
  }
}

export default class Crawler {

  /** 爬虫的外部设置注册信息 */
  // 当前类名
  name = this.constructor.name

  // 用于前端的展示名
  displayName = 'Crawler'

  // 存放所有的爬虫信息
  spiders: Array<Spider> = []

  // 爬虫之间连接转化函数列表
  transforms: Array<Transformer> = []

  // 初始请求列表
  requests: Array<Request> = []

  // 标识初始化状态
  private _isManualInit: boolean = false
   /** 爬虫运行标志位 */

  // 记录当前爬虫是否被初始化
  get _isInitialized(): boolean {
    // 爬虫列表、转换函数以及请求列表皆有值，或者_isManualInit为true
    return (
      (!!this.spiders.length &&
      (!!this.transforms.length || this.spiders.length === 1) &&
      !!this.requests.length) || (this._isManualInit)
    )
  }

  // 标志位，记录当前爬虫是否正在运行
  isRunning: boolean = false

  // 爬虫最后一次激活时间
  lastStartTime: Date = null

  // 由于 SpiderTask 仅记录了开始时间，因此这里使用单独的变量记录当前爬虫的结束与错误时间
  // 爬虫最后一次运行结束时间
  lastFinishTime: Date = null

  // 爬虫最后一次错误发生时间
  lastErrorTime: Date = null

  // 爬虫的最后一条错误信息，由 failedSpiderTasks 中获取
  get lastErrorMessage() {
    let fst: Array<SpiderTask> = this.failedSpiderTasks

    if (!fst || fst.length === 0) {
      return null
    } else {
      // 否则从错误队列中提取出最新的一条
      return fst[fst.length - 1].error.message;
    }
  }

  /** 内部任务 */

  // 存放内部待执行的蜘蛛任务
  waitingSpiderTasks: SpiderTask[] = []

  // 存放内部已经完成的蜘蛛任务
  successfulSpiderTasks: SpiderTask[] = []

  // 存放内部失败的蜘蛛任务
  failedSpiderTasks: SpiderTask[] = []

  /**
 * Description 由子类负责实现，进行内部请求初始化
 */
  @initialized
  initialize() {}

  /**
 * @desc 待复写函数，设置当前的待处理的 URL 或者 Generator
 * @return {this <T extends Crawler>}
 */
  setRequests(requests: Request[]) : this {
    if (!Array.isArray(requests) || requests.length === 0) {
      throw new Error('请输入请求目标数组')
    }

    if (!Request.isValid(requests[0])) {
      throw new Error('请输入有效的请求类型：RequestType')
    }

    requests && (this.requests = requests)

    return this
  }

  /**
 * @desc 添加蜘蛛到当前爬虫流中
 * @param {Spider} spider
 * @returns {this <T extends Crawler>}
 */
  setSpider(spider: Spider): this {
    this.spiders.push(spider)
    return this
  }

  /**
 * @desc 添加转换函数
 * @param transformer
 * @returns {Crawler}
 */
  transform(transformer: Transformer): Crawler {
    this.transforms.push(transformer)
    return this
  }

  /**
   * @desc 重置当前爬虫状态
   */
  reset(): void {
    this.cleanCrawler()
    this.initialize()
  }

  /**
   * @desc 清除爬虫中的信息
   */
  cleanCrawler() {
    this.spiders = []
    this.transforms = []
    this.requests = []
    this.isRunning = false
    this._isManualInit = false
  }

  /**
   * @desc 执行单个爬虫
   */
  async run(isPersist: boolean=false): Promise<boolean> {
    // 重置最后启动时间
    this.lastStartTime = new Date()

    // 判断是否已经初始化
    if (!this._isInitialized) {
      // 初始化构造
      this.initialize()
    }

    // 判断是否设置了合适的爬虫与实例
    if (this.spiders.length === 0 || this.requests.length === 0) {
      throw new Error('请至少设置一个爬虫实例与一个请求！')
    }

    // 初始化将请求映射为爬虫的任务 - 此动作应可以重复执行
    this.waitingSpiderTasks = SpiderTask.map(
      this.requests,
      this.spiders,
      this.transforms
    )

    this.isRunning = true

    // 循环直到所有的待执行任务全部执行完毕
    while (this.waitingSpiderTasks.length > 0) {
      // 取出某个任务实例
      let spiderTask: SpiderTask = this.waitingSpiderTasks.shift();

      let derivedRequests: Array<Request>

      try {
        derivedRequests = await spiderTask.run(isPersist);
        this.successfulSpiderTasks.push(spiderTask)
      } catch (e) {
        // 添加到失败的错误列表中
        this.failedSpiderTasks.push(spiderTask)

        // 设置最后的完成时间
        this.lastErrorTime = new Date()

        // 发生异常时则跳过剩余的执行
        continue
      }

      // 获取下一个爬虫实例的下标
      let index = this.spiders.indexOf(spiderTask.nextSpiderInstance)

      // 根据获取到的新请求来创建新的爬虫任务
      for (const request of derivedRequests) {
        // 添加新的蜘蛛运行任务
        this.waitingSpiderTasks.push(
          new SpiderTask(
            spiderTask.nextSpiderInstance,
            request,
            this.transforms.length > index ? this.transforms[index] : null,
            this.spiders.length > index + 1 ? this.spiders[index + 1] : null
          )
        )
      }
    }

    this.isRunning = false

    // 全部执行完毕，重置最后的结束时间
    this.lastFinishTime = new Date()

    return true
  }
}
