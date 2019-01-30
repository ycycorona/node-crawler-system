import axiosCreator from './axios_creator.js'
import {IAxiosOpts} from 'common/interface.ts'

const simulateBrowser = require('./plugins/simulate-browser')
const interHandleError = require('./interceptors/handle_error')
const options: IAxiosOpts = {
  headers: simulateBrowser().headers,
  interceptors: [interHandleError]
}
export default axiosCreator(options)
