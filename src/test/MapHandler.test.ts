import MapHandler from "utils/map_selector/MapHandler"
import CheerioMapSelector from "utils/map_selector/CheerioMapSelector"
import * as assert from 'assert'
import {mapType} from 'common/interface'

describe('mapHandler', function() {
  it('simple run', function() {
    const pathMap: mapType = {
      'name.full': 'ycy',
      'name.first': 'corona'
    }
    const mapHandler = new MapHandler(pathMap)
    const res = mapHandler.run()
    assert.deepStrictEqual({
      name: {
        full: 'ycy',
        first: 'corona'
      }
    }, res)
  })
})

describe('CheerioMapSelector', function() {
  it('simple run', function() {
    const docStr =
    `<div id="sub-context">
        <div id="full">ycycorona</div>
        <div id="first">corona</div>
      </div>`
    const pathMap: mapType = {
      'name.full': '#full',
      'name.first': {selector: '#first', contextName: 'sub'}
    }
    const contextMap = {
      'sub': '#sub-context'
    }
    const mapHandler = new CheerioMapSelector(docStr, pathMap, contextMap)
    const res = mapHandler.run()
    assert.deepStrictEqual(res.name.full.text(), 'ycycorona')
    assert.deepStrictEqual(res.name.first.text(), 'corona')
  })
})
