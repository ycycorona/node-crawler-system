const loggerConfig = require('./log/log4js.config.prod')
module.exports = {
  chromeOptions: {
    ignoreHTTPSErrors: true,
    headless: true,
    //args: ['--proxy-server=socks5://127.0.0.1:10091'],
    args: ['--no-sandbox'],
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  },
  mongodb: {
    dbUrl: 'mongodb://127.0.0.1:27017/flights-crawler',
    obOptions: {
      useNewUrlParser: true,
      user: 'flightsCrawler',
      pass: 'ycy6323892',
      autoIndex: false
    }
  },
  ctripFlightsPriceSpider: {
    params: {
      baseUrl: 'http://flights.ctrip.com/itinerary/',
      dateStart: '2019-01-10',
      duration: 30,
      dateEnd: '2019-03-10',
      flightLines: [
        ['hrb', 'tao'],
        ['tao', 'hrb'],
        ['zha', 'tao'],
        ['tao', 'zha'],
        ['kry', 'tao'],
        ['tao', 'kry'],
        ['zyi', 'tao'],
        ['tao', 'zyi'],
        ['kwe', 'tao'],
        ['tao', 'kwe'],
        ['lhw', 'tao'],
        ['tao', 'lhw'],
        ['bhy', 'tao'],
        ['tao', 'bhy'],
        ['ckg', 'tao'],
        ['tao', 'ckg'],
        ['kmg', 'tao'],
        ['tao', 'kmg'],
        ['kwl', 'tao'],
        ['tao', 'kwl'],
        ['cgq', 'ynt'],
        ['ynt', 'cgq'],
        ['kwl', 'ynt'],
        ['ynt', 'kwl'],
        ['wnz', 'ynt'],
        ['ynt', 'wnz'],
        ['urc', 'tao'],
        ['tao', 'urc'],
        ['nng', 'tao'],
        ['tao', 'nng'],
        ['cgq', 'tao'],
        ['tao', 'cgq'],
        ['she', 'tao'],
        ['tao', 'she'],
        ['pvg', 'tao'],
        ['tao', 'pvg'],
        ['csx', 'tao'],
        ['tao', 'csx'],
        ['ctu', 'tao'],
        ['tao', 'ctu'],
        ['kwl', 'wnz'],
        ['wnz', 'kwl'],
        ['ynt', 'csx'],
        ['csx', 'ynt'],
        ['kwe', 'wnz'],
        ['wnz', 'kwe'],
        ['jjn', 'hrb'],
        ['hrb', 'jjn'],
        ['nng', 'cgq'],
        ['cgq', 'nng'],
        ['hak', 'cgq'],
        ['cgq', 'hak']
      ]
    }
  },
  logger: loggerConfig
}
