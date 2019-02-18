const path = require('path')

/**
 *
 * @param {string} path
 */
function replaceDriveLetter(path) {
  return path.replace(/^([a-z])(:)/, (...args) => {
    return args[1].toUpperCase() + args[2]
  })
}
module.exports = {
  "entities": [
    replaceDriveLetter(path.join(process.cwd(), "dist/orm/entity/**/*.js"))
  ],
  "migrations": [
    replaceDriveLetter(path.join(process.cwd(), "dist/orm/migration/**/*.js"))
  ],
  "subscribers": [
    replaceDriveLetter(path.join(process.cwd(), "dist/orm/subscriber/**/*.js"))
  ],
  "cli": {
    "entitiesDir": "src/orm/entity",
    "migrationsDir": "src/orm/migration",
    "subscribersDir": "src/orm/subscriber"
  }
}
