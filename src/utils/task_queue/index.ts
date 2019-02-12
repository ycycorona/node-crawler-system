'use strict'
import {queue, AsyncQueue} from 'async'
import * as EventEmitter from 'events'

export interface TaskInterface{
  /** 任务处理函数 */
  taskDo: () => Promise<any>
  resFlag?: boolean
  /** 任务结束或者出错时的处理函数 */
  taskEndHandle?: (err: Error, res: any) => any
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
  queueDrain(thisTaskQueue: TaskQueue) {
    thisTaskQueue.emit('drain')
  }

  taskEndHandle(thisTaskQueue: TaskQueue, err: Error, res: {taskRes: any; task: TaskInterface}) {
    thisTaskQueue.emit('oneTaskEnd', err, res)
  }

  /** 通用的 每个任务的 错误 处理函数 */
  queueError(thisTaskQueue: TaskQueue, error: Error, task: TaskInterface) {
    thisTaskQueue.failTaskList.push(task)
  }

  setQueueDrain(queueDrain: TaskQueue['queueDrain']): this {
    queueDrain && (this.queueDrain = queueDrain)
    return this
  }

  setQueueError(queueError: TaskQueue['queueError']): this {
    queueError && (this.queueError = queueError)
    return this
  }

  /** 任务加入任务队列中 */
  push(task: TaskInterface): boolean {
    if (task.taskEndHandle) {
      this.queueInstance.push(task, task.taskEndHandle)
    } else {
      this.queueInstance.push(task, this.taskEndHandle.bind(this, this))
    }
    return true
  }

  /**
   * @desc 构造函数
   * @param {numbrt} concurrency - 并发任务数
   */
  constructor(concurrency?: number) {
    super()
    this.queueInstance = queue(async (task: TaskInterface) => {
      const res = await task.taskDo()
      return {
        taskRes: res,
        task: task
      }
    }, concurrency || 1)

    this.queueInstance.drain = this.queueDrain.bind(this, this)

    this.queueInstance.error = this.queueError.bind(this, this)
  }
}

const task: TaskInterface = {
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
})
