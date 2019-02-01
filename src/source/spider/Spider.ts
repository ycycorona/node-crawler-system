import SpiderInterface from './SpiderInterface'
import nanoid = require("nanoid");
import {mapType} from 'common/interface'

type SpiderStatus =
  'IDLE' // 进入空闲状态
  | 'FETCH' // 进入抓取状态
  | 'PARSE' // 进入解析状态
  | 'VALIDATE' // 进入校验状态
  | 'PERSIST' // 进入持久化存储

/**
 * Description 蜘蛛中心定义类
 *
 * *Error Handling* 在生产环境下，蜘蛛应该由爬虫统一调度，因此蜘蛛并不需要在本层进行容错，而应该直接抛出异常
 *
 */

export default class Spider implements SpiderInterface {
  // 唯一编号
  readonly uuid: string = nanoid()
  // 当前类名
  readonly name: string = this.constructor.name
  // 模型属性
  extractMap: mapType
  // 传递额外内容
  extra: any
  // 允许动态设置的属性
  url: string
  // 网络请求的参数
  option: object
  /*蜘蛛当前状态*/
  status: SpiderStatus = 'IDLE'
  // 爬虫的执行时间记录
  elapsedTime: {
    fetch: number,
    parse: number,
    validate: number,
    persist: number
  } = {
    fetch: -1,
    parse: -1,
    validate: -1,
    persist: -1
  }

  /**
   * 构造函数
   * @param displayName
   * @param extra
   */
  constructor(readonly displayName: string = 'spider', extra?: any) {
    extra && (this.extra = extra)
  }

  /**
   * 设置配置和请求路径
   * @param url
   * @param option
   */
  setRequest(url: string, option: object = {}): Spider {
    // 设置路径与配置
    url && (this.url = url);
    option && (this.option = option)
    return this;
  }

  /**
   * desc 设置当前蜘蛛的额外信息，额外信息一部分是初始化时候的静态配置，一部分来源于上一个蜘蛛的动态信息
   * @param extra
   */
  setExtra(extra?: any) {
    extra && (this.extra = Object.assign({}, this.extra, extra));
    return this
  }

  /**
   * Description 数据抓取
   */
  async fetch(url: string, option: object): Promise<any> {
    return null
  }

  /**
   * Description 数据提取之前的预处理
   * @param {*} rawData
   */
  beforeExtract(rawData: any): string {
    return rawData;
  }

  /**
   * desc 数据提取
   */
  async extract(rawData: any, extractMap: mapType): Promise<{data: any; $dom?: CheerioStatic}> {
    // 如果是 HTMLSpider 中，则是返回 {data, $dom}
    return {
      data: rawData
    }
  }

  /**
   * desc 数据解析
   */
  async parse(extractedData: any, $dom?: CheerioStatic): Promise<any> {
    return extractedData;
  }

  /**
   * desc 数据校验
   * @param parsedData
   */
  async validate(parsedData: any): Promise<boolean> {
    return true
  }

  /**
   * desc 数据存储
   * @param parsedData
   */
  async persist(parsedData: any): Promise<boolean> {
    return true
  }


  async run(isPersist: boolean = true): Promise<any> {
    let rawData: any

    this.status = 'FETCH'

    let checkPoint: number = Date.now()

    if (!this.url) {
      throw new Error('请设置有效的 URL')
    }

    // 执行数据抓取
    rawData = await this.fetch(this.url, this.option)

    // 由于数据提取是爬虫内部操作，因此此时的状态直接进入了解析
    this.status = 'PARSE'

    // 记录抓取时间
    this.elapsedTime.fetch = Date.now() - checkPoint

    checkPoint = Date.now()

    let beforeExtractedRawData = this.beforeExtract(rawData)

    // 避免用户意外 Hook beforeExtract
    if (!!rawData && !beforeExtractedRawData) {
      throw new Error('beforeExtract 应当设置有效返回值！');
    }

    // 从界面中抽取出选定元素
    let extractedDataOrObject: any = await this.extract(
      beforeExtractedRawData,
      this.extractMap
    )

    let parsedData: any

    // 判断上一步的返回值是对象还是单个数据，这里是特意为 HTMLSpider 预留的功能，方便其返回文档的 DOM 对象到解析函数中
    if (
      extractedDataOrObject && typeof extractedDataOrObject === 'object' &&
      extractedDataOrObject.hasOwnProperty('data') &&
      extractedDataOrObject.hasOwnProperty('$dom')
    ) {
      parsedData = await this.parse(
        extractedDataOrObject.data,
        extractedDataOrObject.$
      );
    } else {
      // 对元素进行解析
      parsedData = await this.parse(extractedDataOrObject.data);
    }

    this.status = 'VALIDATE'

    this.elapsedTime.parse = Date.now() - checkPoint

    checkPoint = Date.now()

    // 对解析结果进行验证
    await this.validate(parsedData)

    this.elapsedTime.validate = Date.now() - checkPoint

    this.status = 'PERSIST'

    checkPoint = Date.now()

    if (isPersist) {
      // 一组执行完毕后进行数据写入
      await this.persist(parsedData);
    }

    this.status = 'IDLE';

    this.elapsedTime.persist = Date.now() - checkPoint

    return parsedData
  }
}
