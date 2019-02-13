import Spider from '../spider/Spider'
import Request from '../spider/Request'
import SpiderTask from './SpiderTask'
import {default as TaskQueue, TaskInterface} from 'utils/task_queue'

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

  isPersist: boolean = true

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

  // 蜘蛛任务队列 列表
  taskQueueList: TaskQueue[] = []

  // 存放内部已经完成的蜘蛛任务
  successfulSpiderTasks: SpiderTask[] = []

  // 存放内部失败的蜘蛛任务
  failedSpiderTasks: SpiderTask[] = []

  /**
 * Description 由子类负责实现，进行内部请求初始化
 * @decoration  @initialized
 */
  // @initialized
  initialize() {}

  /**
 * @desc 待复写函数，设置爬虫的种子 URL 或者 Generator
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
 * @desc 添加蜘蛛到当前爬虫流中 同时根据蜘蛛数量初始化对应的蜘蛛队列
 * @param {Spider} spider
 * @returns {this <T extends Crawler>}
 */
  setSpider(spider: Spider, taskQueueConcurrency?: number): this {
    this.spiders.push(spider)
    // 每 一个蜘蛛 对应 一个任务队列
    this.taskQueueList.push(new TaskQueue(taskQueueConcurrency))
    return this
  }

  /**
 * @desc 添加转换函数
 * @param transformer
 * @returns {this <T extends Crawler>}
 */
  setTransform(transformer: Transformer): this {
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
   * @desc 把待执行列表中的蜘蛛任务加入到对应的蜘蛛任务队列中
   */
  scanWaitingListToTaskQueue() {
    while (this.waitingSpiderTasks.length > 0) {
      // 从待执行列表中取出某个爬虫任务实例，
      let spiderTask: SpiderTask = this.waitingSpiderTasks.shift()
      // 找到任务队列列表和蜘蛛列表的对应项
      const index = this.spiders.indexOf(spiderTask.spiderInstance)
      this.taskQueueList[index].push({
        taskDo: spiderTask.run.bind(spiderTask),
        inData:{spiderTask: spiderTask}
      })
    }
  }

  /**
   * @desc 判断是否所有队列为空闲
   */
  isAllTaskQueueIdle() {
    let isIdle = true
    for (const taskQueue of this.taskQueueList) {
      if(taskQueue.idle() === false) {
        isIdle = false
        break
      }
    }
    return isIdle
  }

  /**
   * @desc 执行单个爬虫
   */
  async run(): Promise<boolean> {
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
    this.waitingSpiderTasks = SpiderTask.initMap(
      this.requests,
      this.spiders,
      this.transforms
    )

    this.isRunning = true

    // 把任务从待执行列表推入执行队列
    this.scanWaitingListToTaskQueue()

    const queueDrainPromises: Promise<any>[] = []

    for (const taskQueue of this.taskQueueList) {
      // 每一个任务执行完毕之后
      taskQueue.on('oneTaskEnd', spiderTaskEndHandler.bind(this))
      taskQueue.on('oneTaskError', spiderTaskErrorHandler.bind(this))
      queueDrainPromises.push(
        new Promise((resolve, reject) => {
          taskQueue.on('drain', () => {
            if (this.waitingSpiderTasks.length > 0) {
              this.scanWaitingListToTaskQueue()
            } else {
              if (this.isAllTaskQueueIdle()) {
                resolve()
              }
            }
          })
        })
      )
    }

    await Promise.all(queueDrainPromises)

    this.isRunning = false

    // 全部执行完毕，重置最后的结束时间
    this.lastFinishTime = new Date()

    return true
  }
}

/**
 * @desc 每个蜘蛛任务执行完成后的回调函数
 * @param err
 * @param res
 */
function spiderTaskEndHandler(err: Error, res: {taskRes: any; task: TaskInterface}) {
  if (err) {

  } else {
    const {spiderTask} = res.task.inData
    this.successfulSpiderTasks.push(spiderTask)
    const derivedRequests = res.taskRes
    // 获取下一个蜘蛛实例的下标
    let index = this.spiders.indexOf(spiderTask.nextSpiderInstance)

    // 根据获取到的新请求来创建新的蜘蛛任务
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

    this.scanWaitingListToTaskQueue()
  }
}

/**
 * @desc 每个蜘蛛任务的错误处理函数
 * @param err
 * @param task
 */
function spiderTaskErrorHandler(err: Error, task: TaskInterface) {
  // 添加到失败的蜘蛛任务加到错误列表中
  this.failedSpiderTasks.push(task.inData.spiderTask)
  // 设置最后的错误时间
  this.lastErrorTime = new Date()
}
