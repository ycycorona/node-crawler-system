import TextSpider from 'source/spider/web/TextSpider'
import * as $ from 'cheerio'
import {ModelType} from "common/interface"

export default class HTMLSpider extends TextSpider {
  async extract(pageHTML: string, model: ModelType): Promise<{data: any; $dom?: HTMLElement}> {
    let pageObject: {[propName: string]: any} = {}
    let $dom: Cheerio = $(pageHTML)

    for (let key in model) {
      // 跳过非自身属性
      if (!model.hasOwnProperty(key)) {
        continue
      }

      // 如果键的起始字符为 $ ，则直接提取
      if (key[0] === '$') {
        // 判断是否为指向自身的
        if (model[key] === 'self') {
          pageObject[key] = $dom
        } else {
          pageObject[key] = $($dom.find(<string>model[key]))
        }
        continue
      }

      // 否则为ModelType 需要分层提取
      let $elementOrElements: Cheerio = $dom.find(key)

      // 判断是否为数组或者单个值
      if ($elementOrElements.length && $elementOrElements.length > 0) {
        // 如果为数组则返回数组
        let elementsLength = $elementOrElements.length
        // 提取到的目标对象
        let $elementsObject = []
        // 遍历所有提取到的一级元素
        for (let i = 0; i < elementsLength; i++) {
          let $element = $($elementOrElements[i])
          let elementObject = {};

          // 遍历所有的二级键
          for (let subKey of Object.keys(<ModelType>model[key])) {
            if (model[key][subKey] === 'self') {
              elementObject[subKey] = $element
            } else {
              // Todo 这里有可能获取到的仍然是某个数组对象
              elementObject[subKey] = $($element.find(model[key][subKey]))
            }
          }

          // 将封装好的数据放置到数组中
          $elementsObject.push(elementObject);
        }
      } else {

      }
    }

    return {data: pageHTML}
  }
}
