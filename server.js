import { connectToServer } from './modules/db'

const hapi = require('hapi')
const routes = require('./routing')

const server = hapi.server({
  // TODO move to config file
  port: 3000,
  host: 'localhost',
})

const init = async () => {
  await server.start()
  await server.register(routes)

  // NOTE - can i make it async ? (do i need?)
  await connectToServer((err, db) => {
    if (err) {
      console.log('Error connecting to db!', { err })
    } else {
      console.log(`Now connected to ${db.s.url}`)
    }
  })

  console.log(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
