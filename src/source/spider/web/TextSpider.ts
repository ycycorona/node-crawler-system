import Spider from '../Spider'

/**
 * desc 简单的基于 HTTP 的爬虫
 */
export default class TextSpider extends Spider {
  /**
   * Description 数据抓取
   * @param url
   * @param option
   * @returns {Promise}
   */
  async fetch(url: string, option: Object): Promise<any> {
    return new Promise(async (resolve, reject) => {
      // 设置抓取过时，最多 1 分钟
      setTimeout(() => {
        reject(
          new Error(
            JSON.stringify({
              spiderName: this.name,
              message: '抓取超时',
              url: this.url,
              time: new Date()
            })
          )
        );
      }, 60 * 1000);

      resolve();
    });
  }
}
