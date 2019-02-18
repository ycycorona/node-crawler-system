import JSONSpider from "source/spider/web/JSONSpider"
import { getConnection, createConnection } from "typeorm"
import { FlightInfo } from "orm/entity/FlightInfo"
import { StopInfo } from "orm/entity/StopInfo"
import { CabinInfo } from "orm/entity/CabinInfo"
import { FlightRoute } from "orm/entity/FlightRoute"

export default class FlightInfoSpider extends JSONSpider {

  isPersist = true

  /**
   * @function 解析函数
   * @param pageObject
   * @returns {Array}
   */
  async parse(extractedData: {[propName: string]: any}): Promise<any> {

    let flag = true
    if (!(extractedData.status === 0 && extractedData.data.error===null)) {
      flag = false
    }
    if (!flag) {throw Error('数据解析失败-1')}

    const flightInfoList: any[] = []
    if(flag) {
      const routeList = extractedData.data.routeList ? extractedData.data.routeList : []
      for (const route of routeList) {
        if (route.routeType === 'Flight') {
          const flightInfo: {[key: string]: any} = {}
          const info = route.legs[0].flight
          flightInfo.airlineName = info.airlineName
          flightInfo.airlineCode = info.airlineCode
          flightInfo.craftTypeName = info.craftTypeName
          flightInfo.flightNumber = info.flightNumber
          flightInfo.departureAirportInfo = info.departureAirportInfo
          flightInfo.arrivalAirportInfo = info.arrivalAirportInfo
          flightInfo.departureDate = info.departureDate
          flightInfo.arrivalDate = info.arrivalDate
          flightInfo.stopInfo = info.stopInfo
          flightInfo.cabins = []
          for (const ca of route.legs[0].cabins) {
            const cabin: {[key: string]: any} = {}
            cabin.salePrice = ca.price.salePrice
            cabin.price = ca.price.price
            cabin.cabinClass = ca.cabinClass
            cabin.priceClass = ca.priceClass
            cabin.rate = ca.price.rate
            cabin.seatCount = ca.seatCount
            cabin.refundEndorse = ca.refundEndorse
            cabin.productInfoList = ca.productInfoList
            flightInfo.cabins.push(cabin)
          }
          flightInfoList.push(flightInfo)
        }
      }
      return flightInfoList
    } else {
      throw Error('数据解析失败-2')
    }

  }

  async persist(flightInfoList: any[]): Promise<boolean> {
    const nowDate = new Date()
    const connection = getConnection()
    const FlightInfoRepo = connection.getRepository(FlightInfo)
    const StopInfoRepo = connection.getRepository(StopInfo)
    const CabinInfoRepo = connection.getRepository(CabinInfo)
    const FlightRouteRepo = connection.getRepository(FlightRoute)


    for (const flightInfo of flightInfoList) {
      flightInfo.getTime = nowDate
      const flightInfoEntity = FlightInfoRepo.create(<FlightInfo>flightInfo)

      const cabinInfos = <CabinInfo[]> (flightInfo.cabins || []).map((rawCabin: any) => {
        return CabinInfoRepo.create(rawCabin)
      })

      const stopInfos = <StopInfo[]> (flightInfo.stopInfo || []).map((rawStopInfo: any) => {
        const rawStopInfo_1 = {
          startDate: rawStopInfo.dateRange.startDate,
          endDate: rawStopInfo.dateRange.endDate,
          cityCode: rawStopInfo.cityCode,
          cityName: rawStopInfo.cityName,
        }
        return StopInfoRepo.create(<StopInfo>rawStopInfo_1)
      })

      const flightRouteRaw = {
        dAirportTlc: flightInfo.departureAirportInfo.airportTlc,
        dCityTlc: flightInfo.departureAirportInfo.cityTlc,
        dAirportName: flightInfo.departureAirportInfo.airportName,
        dCityName: flightInfo.departureAirportInfo.cityName,
        aAirportTlc: flightInfo.arrivalAirportInfo.cityName,
        aCityTlc: flightInfo.arrivalAirportInfo.cityName,
        aAirportName: flightInfo.arrivalAirportInfo.cityName,
        aCityName: flightInfo.arrivalAirportInfo.cityName
      }

      let flightRoute: FlightRoute = null
      const flightRouteGet = FlightRouteRepo.create(<FlightRoute>flightRouteRaw)

      const flightRouteDb = await FlightRouteRepo.findOne(flightRouteGet)
      if (!flightRouteDb) {
        await FlightRouteRepo.save(flightRouteGet)
        flightRoute = flightRouteGet
      } else {
        flightRoute = flightRouteDb
      }

      await CabinInfoRepo.save(cabinInfos)
      await StopInfoRepo.save(stopInfos)

      flightInfoEntity.flightRoute = flightRoute
      flightInfoEntity.cabinInfos = cabinInfos
      flightInfoEntity.stopInfos = stopInfos
      await FlightInfoRepo.save(flightInfoEntity)
    }
    return true
  }

  /**
   * Description 校验检测到的数据是否准确
   * @param stories
   */
  async validate(stories: any) {
    return true
  }
}
