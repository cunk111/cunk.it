// const jsonController = require('./controller/jsonController')

// const {
//   validateJson,
//   // getJson,
//   // postJson,
// } = require('./controller/jsonController')


import {
  validateJson,
  // getJson,
  // postJson,
} from './controller/jsonController'

const Joi = require('joi')

const routing = {
  name: 'routing',
  version: '1.0.0',
  async register(server, options) {

    // NOTE - friendly landing page
    server.route({
      method: 'GET',
      path: '/',
      handler(request, h) {
        // eslint-disable-next-line
        const data = 'Hey! Glad you made it here. Now let\'s get to the  basics of this API. You cant GET nothing, you need to GET /json/$something, okay?\n2. You cant POST nothing, you need to POST /json/$something, mmmkay?!'
        return h.response(data).code(200)
      },
    })

    // NOTE - not sure worth keeping
    server.route({
      method: 'GET',
      path: '/json',
      handler(request, h) {
        // eslint-disable-next-line
        const data = 'Bad Request, bad boy! Seems like you wanna get some more of these...json, muright?\nHeres what you can GET:\n\t- GET /json/ for general API documentation\n\t- GET /json/$id to get a known json record'
        return h.response(data).code(403)
      },
    })

    // NOTE - READ DOC
    server.route({
      method: 'GET',
      path: '/json/{id}',
      handler(request, h) {
        return h.response('ongoing implementing').code(500)
      },
    })

    // NOTE - CREATE DOC
    server.route({
      method: 'POST',
      path: '/json',
      handler(request, h) {
        console.log('ici', request.payload, typeof request.payload)
        if (validateJson(request.payload)) {
          return `hello, Post! We received: ${JSON.stringify(request.payload)}`
        }
        return h.response('and what\'s your payload hun\' ?').code(403)
      },
      config: {
        validate: {
          payload: {
            json: Joi.object().required(),
          },
          // TODO - friendlier message
          failAction: (request, h, error) => error,
        },
      },
    })

    // NOTE - UPDATE DOC
    server.route({
      method: 'POST',
      path: '/json/{id}',
      handler(request, h) {
        console.log('ici', request.payload, typeof request.payload)
        if (validateJson(request.payload)) {
          return `hello, Post! We received: ${JSON.stringify(request.payload)}`
        }
        return h.response('and what\'s your payload hun\' ?').code(403)
      },
      config: {
        validate: {
          payload: {
            json: Joi.object().required(),
          },
          // TODO - friendlier message
          failAction: (request, h, error) => error,
        },
      },
    })
  },
}

module.exports = routing
