// import "reflect-metadata"
import * as _config from 'config'
const config: any = _config
import { createConnection } from "typeorm"
import { FlightInfo } from "orm/entity/FlightInfo"
import { FlightRoute } from "orm/entity/FlightRoute"
import { StopInfo } from "orm/entity/StopInfo"
import { CabinInfo } from "orm/entity/CabinInfo"

// {
//   "type": "mysql",
//   "host": "47.105.46.120",
//   "port": 60001,
//   "username": "root",
//   "password": "ycy6323892",
//   "database": "media_db",
//   "synchronize": false,
//   "logging": false,
//   "logger": "file",
//   "entities": [
//      "D:\\code\\personal\\node-crawler-system\\dist\\orm\\entity\\**\\*.js"
//   ],
//   "migrations": [
//      "dist/orm/migration/**/*.js"
//   ],
//   "subscribers": [
//      "dist/orm/subscriber/**/*.js"
//   ],
//   "cli": {
//      "entitiesDir": "src/orm/entity",
//      "migrationsDir": "src/orm/migration",
//      "subscribersDir": "src/orm/subscriber"
//   }
// }
createConnection(config.orm)
.then(async connection => {
  const rawData: any = {
    "airlineName": "海南航空",
    "airlineCode": "HU",
    "sharedFlightNumber": "",
    //"sharedFlightName": null,
    "craftTypeName": "波音 737-800",
    "flightNumber": "HU7276",
    "departureDate": "2019-01-18 16:15:00",
    "arrivalDate": "2019-01-18 18:30:00",
    "cabins": [{
      "salePrice": 495,
      "price": 495,
      "cabinClass": "Y",
      "priceClass": "N",
      "rate": 0.42,
      "seatCount": 2,
      "specialClassName": "",
      "productInfoList": ["AirlineMarketing"]
    }, {
      "salePrice": 500,
      "price": 500,
      "cabinClass": "Y",
      "priceClass": "N",
      "rate": 0.42,
      "seatCount": 1,
      "specialClassName": "",
      "productInfoList": ["BusinessPriority"]
    }, {
      "salePrice": 1305,
      "price": 1305,
      "cabinClass": "C",
      "priceClass": "I",
      "rate": 0.37,
      "seatCount": 2,
      "specialClassName": "超值公务舱",
      "productInfoList": ["AirlineMarketing"]
    }, {
      "salePrice": 1190,
      "price": 1190,
      "cabinClass": "Y",
      "priceClass": "Y",
      "rate": 1,
      "seatCount": 1,
      "specialClassName": "",
      "productInfoList": ["Normal"]
    }, {
      "salePrice": 3570,
      "price": 3570,
      "cabinClass": "C",
      "priceClass": "C",
      "rate": 1,
      "seatCount": 6,
      "specialClassName": "",
      "productInfoList": ["Normal"]
    }],
    "getTime": "2019-01-18 13:49:18",
    "stopInfo": [{
      "dateRange": {
          "startDate": "2019-02-20 14:55:00",
          "endDate": "2019-02-20 17:30:00"
      },
      "cityCode": "NGB",
      "cityName": "宁波"
  }]
  }
  const FlightInfoRepo = connection.getRepository(FlightInfo)
  const StopInfoRepo = connection.getRepository(StopInfo)
  const CabinInfoRepo = connection.getRepository(CabinInfo)

  const flightInfo = FlightInfoRepo.create(<FlightInfo>rawData)

  const cabinInfos = <Array<CabinInfo>>(rawData.cabins).map((rawCabin: any) => {
    return CabinInfoRepo.create(<CabinInfo>rawCabin)
  })

  const stopInfos = <Array<StopInfo>>rawData.stopInfo.map((rawStopInfo: any) => {
    const rawStopInfo_1 = {
      startDate: rawStopInfo.dateRange.startDate,
      endDate: rawStopInfo.dateRange.endDate,
      cityCode: rawStopInfo.cityCode,
      cityName: rawStopInfo.cityName,
    }
    return StopInfoRepo.create(<StopInfo>rawStopInfo_1)
  })

  await CabinInfoRepo.save(cabinInfos)
  await StopInfoRepo.save(stopInfos)

  flightInfo.cabinInfos = cabinInfos
  flightInfo.stopInfos = stopInfos
  await FlightInfoRepo.save(flightInfo)
  console.log('finish')
})
.catch(error => console.log(error))
