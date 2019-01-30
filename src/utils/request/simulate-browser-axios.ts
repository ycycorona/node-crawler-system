import axiosCreator from './axios_creator.js'
import {IAxiosOpts} from 'common/interface.ts'
import simulateBrowser from './plugins/simulate_browser'
import interHandleError from './interceptors/handle_error'
const options: IAxiosOpts = {
  headers: simulateBrowser().headers,
  interceptors: [interHandleError]
}
export default axiosCreator(options)
