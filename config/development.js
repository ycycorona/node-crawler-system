const loggerConfig = require('./log/log4js.config.dev')
module.exports = {
  axios: {
    useProxy: true,
    proxyProtocol: 'SOCKS5',
    proxyHost: '127.0.0.1',
    proxyPort: '10091',
  },
  chromeOptions: {
    executablePath: 'D:\\code\\personal\\flights-crwaler\\node_modules\\puppeteer\\.local-chromium\\win64-609904\\chrome-win\\chrome.exe',
    ignoreHTTPSErrors: true,
    headless: false,
    args: ['--proxy-server=socks5://127.0.0.1:10091'],
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  },
  mongodb: {
    dbUrl: 'mongodb://47.105.46.120:27017/flights-crawler',
    obOptions: {
      useNewUrlParser: true,
      user: 'flightsCrawler',
      pass: 'ycy6323892',
    }
  },
  ctripFlightsPriceSpider: {
    params: {
      baseUrl: 'https://flights.ctrip.com/itinerary/',
      dateStart: '2019-01-11',
      duration: 1,
      dateEnd: '2019-01-11',
      flightLines: [
        ['hrb', 'tao'],
/*        ['tao', 'hrb'],
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
        ['cgq', 'hak']*/
      ]

    }
  },
  logger: loggerConfig
}
