/**
 * @function 蜘蛛接口定义
 */
export default interface SpiderInterface {
  // 爬虫展示名
  displayName: string

  // 模型属性
  model: any

  // 通过构造函数传入的外部信息
  extra?: any

  // 抓取函数
  fetch(...args: any[]): Promise<any>

  // 提取函数
  extract(...args: any[]): Promise<object>

  // 解析函数
  parse(...args: any[]): Promise<any>

  // 验证函数
  validate(...args: any[]): Promise<boolean>

  // 数据存储
  persist(...args: any[]): Promise<boolean>

  // 最终执行函数
  run(...args: any[]): Promise<boolean>
}
