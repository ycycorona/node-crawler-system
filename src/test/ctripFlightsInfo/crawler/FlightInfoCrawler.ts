import * as _config from 'config'
const config: any = _config
import {default as Crawler, initialized} from "source/crawler/Crawler"
import FlightInfoSpider from "../spider/FlightInfoSpider"
import Request from 'source/spider/Request'
import * as util from '../util'
import * as dayjs from 'dayjs'


/**
 * Description 携程机票爬虫
 */
export default class FlightInfoCrawler extends Crawler {
  @initialized
  initialize() {
    const {
      directAjaxURL,
      flightLines, // 航线列表
      duration,
    } = config.ctripFlightsPriceSpider.params

    // 一些元数据
    const dateStart = dayjs().format('YYYY-MM-DD')
    const dateEnd = dayjs().add(duration-1, 'day').format('YYYY-MM-DD')
    const dateList = util.getDateList(dateStart, dateEnd) // 日期列表初始化

    let requests: Request[] = []
    // 构建所有的蜘蛛
    for (const flightLine of flightLines) {
      for (const date of dateList) {
        const requestData = {
          "flightWay": "Oneway",
          "classType": "ALL",
          "hasChild": false,
          "hasBaby": false,
          "searchIndex": 1,
          "airportParams": [{
            "dcity": flightLine[0],
            "acity": flightLine[1],
            "date": date,
            "aport": "",
            "aportname": ""
          }],
          "army": false,
        }
        const headers = {
          'Referer': `https://flights.ctrip.com/itinerary/oneway/${flightLine[0]}-${flightLine[1]}?date=${date}`,
          'Origin': 'https://flights.ctrip.com',
        }
        requests.push({
          url: directAjaxURL,
          option: {
            method: 'POST',
            //url: directAjaxURL,
            data: requestData,
            headers
          }
        })
      }
    }
    const spiderIns = new FlightInfoSpider()
    this
    .setRequests(requests)
    .setSpider(
      spiderIns, 5
    )
  }
}
