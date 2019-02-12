import {queue, AsyncQueue} from 'async'

export interface TaskInterface {
  /** 任务处理函数 */
  taskDo: () => Promise<any>
  /** 任务结束或者出错时的处理函数 */
  taskEndHandle?: (err: Error, res: any) => any
  resFlag: boolean
  inData?: {[key: string]: any}
  outData?: {[key: string]: any}
  toString?: () => string
  // status: 'pre' | 'ing' | 'ed'
}

export default class TaskQueue {
  failTaskList: TaskInterface[]
  successTaskList: TaskInterface[]
  taskNumber: number
  queueInstance: AsyncQueue<TaskInterface>

  /** 队列完成时的处理函数 */
  queueDrain() {
    console.log('drain')
  }

  /** 通用的 每个任务的 错误 处理函数 */
  queueError(error: Error, task: TaskInterface) {
    console.log(error)
    this.failTaskList.push(task)
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
      this.queueInstance.push(task)
    }
    return true
  }

  /**
   * @desc 构造函数
   * @param {numbrt} concurrency - 并发任务数
   */
  constructor(concurrency?: number) {
    this.queueInstance = queue(async (task: TaskInterface) => {
      await task.taskDo()
      return true
    }, concurrency || 1)

    this.queueInstance.drain = async () => {
      console.log('队列完成')
    }

    this.queueInstance.empty = () => {
      console.log('empty')
    }

    this.queueInstance.error = this.queueError
  }
}

const task: TaskInterface = {
  taskDo: async function() {
    console.log('任务执行')
    return 123
  },
  resFlag: false,
  taskEndHandle: () => {
    console.log('taskEnd')
  }
}

const o = new TaskQueue()
o.push(task)
o.push(task)

setTimeout(function() {
  console.log(o)
}, 2000)
// o.queueError = 123
