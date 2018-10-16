// import mongodb from 'mongodb'


// export default {
//   const url = 'mongodb://localhost:27017'
//   const { MongoClient } = mongodb
// }


// const test = require('assert')
//
// // TODO - migrate to ENV
// const url = 'mongodb://localhost:27017'
// // Database Name
// const dbName = 'CUNK-CLUST-0'
// // Connect using MongoClient
// MongoClient.connect(url, (error, client) => {
//   // Use the admin database for the operation
//   if (error) {
//     console.log('Error connecting to db!', { error })
//   }
//   // if (client) {
//   //   console.log({ client })
//   // }
//   const adminDb = client.db(dbName).admin()
//   // List all the available databases
//   adminDb.listDatabases((err, dbs) => {
//     // console.log(dbs.databases)
//     test.equal(null, err)
//     test.ok(dbs.databases.length > 0)
//     client.close()
//   })
// })


const { MongoClient } = require('mongodb')
// const config = require('../../config.js').config

let _db

module.exports = {

  connectToServer(cb) {
    MongoClient.connect(config.database, (err, db) => {
      _db = db
      return cb(err, db)
    })
  },
  getDb() {
    return _db
  },
  promisedMongo() {
    // const database = config.test ? config.test_database : config.database
    return MongoClient.connect(config.database)
  },
}
