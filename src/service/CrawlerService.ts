import * as Koa from 'koa'
import * as cors from 'kcors'
import * as Router from 'koa-router'
import CrawlerScheduler from "../source/crawler/CrawlerScheduler"
import pidusage = require("pidusage");

interface HttpOption {
  host: string
  port: number
}


const app: Koa = new Koa()
// 添加 CORS 支持
app.use(cors())

// 初始化路由设置
const router = new Router()

/**
 * Description 获取操作系统信息
 * @returns {Promise<{Number, String}>>}
 */
async function getOSInfo(): Promise<{ cpu: number, memory: string }> {
  return new Promise(resolve => {
    pidusage(process.pid, function (err, stat) {
      resolve({
        cpu: stat.cpu,
        memory: Math.round((stat.memory / 1024 / 1024) * 100) / 100 + ' MB'
      })
    })
  })
}

export default class CrawlerService {
  private crawlerScheduler: CrawlerScheduler
  private httpOption: HttpOption

  /**
   * @function 默认构造函数
   * @param crawlerScheduler
   * @param httpOption
   */
  constructor(
    crawlerScheduler: CrawlerScheduler,
    httpOption: HttpOption = {
      host: "0.0.0.0",
      port: 3001
    }
  ) {
    crawlerScheduler && (this.crawlerScheduler = crawlerScheduler);
    httpOption && (this.httpOption = httpOption);
  }

  async run() {
    router.get("/", function(ctx, next) {
      ctx.body = {
        message: "欢迎使用 Crawler Server"
      }
    })

    // 使用预定义路由
    app.use(router.routes()).use(router.allowedMethods())

    app.listen(this.httpOption.port, this.httpOption.host, () => {
      const baseUrl = `${this.httpOption.host}:${this.httpOption.port}`;

      console.log(
        `
          爬虫服务端开始运行：
          ${baseUrl}/ - 服务端根入口
          ${baseUrl}/crawlers - 查看爬虫列表
          ${baseUrl}/crawler/:crawlerName - 查看某个爬虫详情
          ${baseUrl}/start/all - 启动所有爬虫
          ${baseUrl}/start/:crawlerName - 启动所有爬虫
          ${baseUrl}/status - 查看系统状态
        `
      )
    })
  }
}
