import {
  validateJson,
  getJson,
  postJson,
} from './controller/jsonController'

const Joi = require('joi')

const routing = {
  name: 'routing',
  version: '1.0.0',
  async register(server, options) {

    // NOTE - API QUICK REF
    server.route({
      method: 'GET',
      path: '/',
      handler(request, h) {
        // eslint-disable-next-line
        const data = 'Hey! Glad you made it here. Now let\'s get to the  basics of this API. You cant GET nothing, you need to GET /json/$something, okay?\n2. You cant POST nothing, you need to POST /json/$something, mmmkay?!'
        return h.response(data).code(200)
      },
    })

    // NOTE - READ DOCUMENT
    server.route({
      method: 'GET',
      path: '/json/{id}',
      handler(request, h) {
        return getJson(request.params.id, h)
        // h.response('ongoing implementing').code(500)
      },
    })

    // NOTE - CREATE DOCUMENT
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
