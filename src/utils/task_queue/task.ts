import {TaskInterface} from './index'

export default class Task implements TaskInterface {
  taskDo: () => any
  taskEndHandle: (err: Error, res: any) => any
  inData: {[key: string]: any}
  outData: {[key: string]: any}
  status: 'pre' | 'ing' | 'ed'
  resFlag: boolean
  toString: () => string
}
