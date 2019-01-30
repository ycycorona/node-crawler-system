module.exports = {
  "appenders": {
    "console": {
      "type": "console",
      "layout": {
        "type": "pattern",
        "pattern": "%[[%d{ISO8601}][%p %z %c %X{filePath}] - %m%]"
      }
    },
    "trace": {
      "type": "dateFile",
      "filename": "./tmp/logs/access-",
      "pattern": ".yyyy-MM-dd.log",
      "alwaysIncludePattern": true,
      "maxLogSize ": 31457280
    },
    "http": {
      "type": "logLevelFilter",
      "appender": "trace",
      "level": "trace",
      "maxLevel": "trace"
    },
    "info": {
      "type": "dateFile",
      "filename": "./tmp/logs/info-",
      "encoding": "utf-8",
      "pattern": ".yyyy-MM-dd.log",
      "maxLogSize": 10000000,
      "alwaysIncludePattern": true,
      "layout": {
        "type": "pattern",
        "pattern": "[%d{ISO8601}][%p %z %c %X{filePath}] - %m"
      },
      "compress": true
    },
    "maxInfo": {
      "type": "logLevelFilter",
      "appender": "info",
      "level": "debug",
      "maxLevel": "info"
    },
    "error": {
      "type": "dateFile",
      "filename": "./tmp/logs/error-",
      "pattern": ".yyyy-MM-dd.log",
      "maxLogSize": 10000000,
      "encoding": "utf-8",
      "alwaysIncludePattern": true,
      "layout": {
        "type": "pattern",
        "pattern": "[%d{ISO8601}][%p %z %c %X{filePath}] - %m"
      },
      "compress": true
    },
    "minError": {
      "type": "logLevelFilter",
      "appender": "error",
      "level": "error"
    },
    "directScript": {
      "type": "dateFile",
      "filename": "./tmp/logs/directScript-",
      "encoding": "utf-8",
      "pattern": ".yyyy-MM-dd.log",
      "maxLogSize": 10000000,
      "alwaysIncludePattern": true,
      "layout": {
        "type": "pattern",
        "pattern": "[%d{ISO8601}][%p %z %c %X{filePath}] - %m"
      },
      "compress": true
    }
  },
  "categories": {
    "default": {
      "appenders": [
        "console",
        "http",
        "maxInfo",
        "minError"
      ],
      "level": "all"
    },
    "save-flight-infos": {
      "appenders": [
        "console",
        "directScript",
      ],
      "level": "all"
    }
  }
}
