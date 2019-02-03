import * as path from 'path'
import * as _config from 'config'
const config: any = _config
const log4jsConfig = config.logger
const log4js = require('log4js').configure(log4jsConfig)

export default (filename: string, category?: string) => {
  const logger = log4js.getLogger(category || '')
  logger.addContext('filePath', path.relative(process.cwd(), filename)) // 日志添加文件相对路径
  return logger
}
