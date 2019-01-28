
import Koa from 'koa'
import cors from 'kcors'
import Router from 'koa-router'
import Rouappter from 'koa-router'
import * as os from 'os'
import pusage from 'pidusage'

const app: Koa = new Koa()

// 添加 CORS 支持
app.use(cors())

// 初始化路由设置
const router = new Router()

/**
 * Description 获取操作系统信息
 * @returns {Promise}
 */
async function getOSInfo(): Promise<{cpu: string, memory: number}> {
    return new Promise(resolve => {
      pusage.stat(process.pid, function(err, stat) {
        resolve({
          cpu: stat.cpu,
          memory: 1 - stat.memory / os.totalmem()
        });
      });
    });
}
