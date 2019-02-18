module.exports = {
  "type": "mysql",
   "host": "47.105.46.120",
   "port": 60001,
   "username": "root",
   "password": "ycy6323892",
   "database": "media_db",
   "synchronize": false,
   "logging": false,
   "logger": "file",
   "entities": [
      "dist/orm/entity/**/*.js"
   ],
   "migrations": [
      "dist/orm/migration/**/*.js"
   ],
   "subscribers": [
      "dist/orm/subscriber/**/*.js"
   ],
   "cli": {
      "entitiesDir": "src/orm/entity",
      "migrationsDir": "src/orm/migration",
      "subscribersDir": "src/orm/subscriber"
   }
}
