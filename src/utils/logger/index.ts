import * as path from 'path'
import * as _config from 'config'
const config: any = _config
const log4jsConfig = config.logger
import * as log4js from 'log4js'
const configed_log4js = log4js.configure(log4jsConfig)

export default (filename: string, category?: string) => {
  const logger = configed_log4js.getLogger(category || '')
  logger.addContext('filePath', path.relative(process.cwd(), filename)) // 日志添加文件相对路径
  return logger
}
