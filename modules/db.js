import { MongoClient } from 'mongodb'
import config from '../config'

let _db

module.exports = {
  connectToServer(cb) {
    MongoClient.connect(config.db.url, { useNewUrlParser: true }, (err, db) => {
      _db = db
      return cb(err, db)
    })
  },
  getDb() {
    return _db
  },
  // promisedMongo() {
  //   // const database = config.test ? config.test_database : config.database
  //   return MongoClient.connect(config.database)
  // },
}
