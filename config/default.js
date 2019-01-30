const loggerConfig = require('./log/log4js.config.default')
module.exports = {
  chromeOptions: {
    ignoreHTTPSErrors: true,
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  },
/*  mongodb: {
    dbUrl: 'mongodb://47.105.46.120:27017/flights-crawler',
    obOptions: {
      useNewUrlParser: true,
      user: 'flightsCrawler',
      pass: 'ycy6323892',
    }
  },*/
  ctripFlightsPriceSpider: {
    params: {
      baseUrl: 'https://flights.ctrip.com/itinerary/',
      dateStart: '',
      dateEnd: '',
      flightLines: []
    },
    rawFlightInfoListSavePath: './raw-data/flight-info-list/'
  },
  logger: loggerConfig
}
