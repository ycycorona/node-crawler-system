'use strict'
import {queue, AsyncQueue} from 'async'
import * as EventEmitter from 'events'

export interface TaskInterface{
  /** 任务处理函数 */
  taskDo: () => Promise<any>
  resFlag?: boolean
  /** 任务结束或者出错时的处理函数 */
  taskEndHandler?: (err: Error, res: any) => any
  inData?: {[key: string]: any}
  outData?: {[key: string]: any}
  toString?: () => string
  // status: 'pre' | 'ing' | 'ed'
}

export default class TaskQueue extends EventEmitter  {
  failTaskList: TaskInterface[] = []
  successTaskList: TaskInterface[] = []
  taskNumber: number = 0
  queueInstance: AsyncQueue<TaskInterface>

  /** 队列完成时的处理函数 */
  queueDrainHandler(thisTaskQueue: TaskQueue) {
    thisTaskQueue.emit('drain')
  }

  taskEndHandler(thisTaskQueue: TaskQueue, err: Error, res: {taskRes: any; task: TaskInterface}) {
    if (!err) {
      thisTaskQueue.successTaskList.push(res.task)
    }
    thisTaskQueue.emit('oneTaskEnd', err, res)
  }

  /** 通用的 每个任务的 错误 处理函数 */
  taskErrorhandler(thisTaskQueue: TaskQueue, err: Error, task: TaskInterface) {
    thisTaskQueue.failTaskList.push(task)
    thisTaskQueue.emit('oneTaskError', err, task)
  }

  setQueueDrainHandler(queueDrainHandler: TaskQueue['queueDrainHandler']): this {
    queueDrainHandler && (this.queueDrainHandler = queueDrainHandler)
    return this
  }

  setTaskErrorhandler(queueError: TaskQueue['taskErrorhandler']): this {
    queueError && (this.taskErrorhandler = queueError)
    return this
  }

  /** 任务加入任务队列中 */
  push(task: TaskInterface): boolean {
    if (task.taskEndHandler) {
      this.queueInstance.push(task, task.taskEndHandler)
    } else {
      this.queueInstance.push(task, this.taskEndHandler.bind(this, this))
    }
    return true
  }

  idle() {
    return this.queueInstance.idle()
  }

  /**
   * @desc 构造函数
   * @param {numbrt} concurrency - 并发任务数
   */
  constructor(concurrency?: number, readonly displayName: string = 'taskQueue') {
    super()
    this.queueInstance = queue(async (task: TaskInterface) => {
      const res = await task.taskDo()
      return {
        taskRes: res,
        task: task
      }
    }, concurrency || 1)

    this.queueInstance.drain = this.queueDrainHandler.bind(this, this)

    this.queueInstance.error = this.taskErrorhandler.bind(this, this)
  }
}

/* const task: TaskInterface = {
  taskDo: async function() {
    console.log('我是一个任务')
    return 123
  },
  resFlag: false
}
const person = {
  name: 'ycy'
}


const o = new TaskQueue()
o.push(task)
o.push(task)

o.on('drain', () => {
  console.log('drain')
})

o.on('oneTaskEnd', () => {
  console.log('oneTaskEnd')
}) */
