import * as _ from 'lodash'
import {mapType} from 'common/interface'

export type resMapType = {
  [propName: string]: any | resMapType
}

export default class MapHandler {
  // 需要处理的字典
  private map: mapType
  // 处理后的字典
  private resMap: resMapType = {}

  // 字典项的处理函数
  protected handler(p: any) {
    return p
  }

  setMap(map: mapType) {
    this.map = map
  }

  private sethandler(handler: ()=>any) {
    this.handler = handler
  }

  getResMap() {
    return this.resMap
  }

  constructor(map: mapType, handler?: ()=>any) {
    map && (this.map = map)
    handler && (this.handler = handler)
  }

  appendItemResToMapRes(key: string, itemRes: any) {
    _.set(this.resMap, key, itemRes)
  }

  run() {
    if (!this.map) { throw Error('map未指定')}
    for(const key in this.map) {
      const itemRes = this.handler(this.map[key])
      this.appendItemResToMapRes(key, itemRes)
    }
    return this.resMap
  }
}
