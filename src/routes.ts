'use strict'

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'Hello, bubu!'
  },
})

server.route({
  method: 'GET',
  path: '/sdsd',
  handler: (request, h) => {
    console.log({ request }, { h })
    return 'Hello, fucka!'
  },
})
