import pidusage = require("pidusage")

export default class RuntimeInfoService {
  /**
   * Description 获取操作系统信息
   * @returns {Promise<{Number, String}>>}
   */
  static async getOSInfo(): Promise<{ cpu: number, memory: string }> {
    return new Promise(resolve => {
      pidusage(process.pid, function (err, stat) {
        resolve({
          cpu: stat.cpu,
          memory: Math.round((stat.memory / 1024 / 1024) * 100) / 100 + ' MB'
        })
      })
    })
  }
}
