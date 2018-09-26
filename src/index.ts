'use strict'

const hapi = require('hapi')

const server = hapi.server({
  port: 3000,
  host: 'localhost',
})

const init = async () => {
  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()

exports.register = (server, options, next) => {
  server.route({})
}

exports.register.attributes = {
  name: 'routes',
}
