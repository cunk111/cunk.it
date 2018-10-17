import { connectToServer } from './modules/db'

const hapi = require('hapi')
const routes = require('./routing')

const server = hapi.server({
  // TODO move ton gitignored file
  port: 3000,
  host: 'localhost',
})

const init = async () => {
  await server.start()
  await server.register(routes)
  console.log(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()

const test = connectToServer((err, db) => {
  console.log({ err }, { db })
})
// const { MongoClient } = require('mongodb')
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
