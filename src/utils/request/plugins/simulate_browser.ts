import * as _ from 'lodash'
import {IAxiosOpts} from 'common/interface.ts'
export default (options: IAxiosOpts = {}): IAxiosOpts => {
  const defaultOptions = {
    'accept': '*/*',
    'accept-encoding': 'gzip, deflate',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7,zh-TW;q=0.6',
    'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
  }
  const headers: object = _.assignWith(defaultOptions, options, (objVal, srcVal) => {
    return objVal ? objVal : srcVal
  })
  return {headers}
}
