import {
  getAllJson,
  getJson,
  postNewJson,
  postJsonDiff,
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
      handler: (request, h) => {
        // TODO - move to a page
        // eslint-disable-next-line
        const data = 'Hey! Glad you made it here. Now let\'s get to the  basics of this API. You cant GET nothing, you need to GET /json/$something, okay?\n2. You cant POST nothing, you need to POST /json/$something, mmmkay?!'
        return h.response(data).code(200)
      },
    })

    // NOTE - GET ALL DOCS
    server.route({
      method: 'GET',
      path: '/json',
      handler: (request, h) => getAllJson(h),
    })

    // NOTE - READ DOCUMENT
    server.route({
      method: 'GET',
      path: '/json/{id}',
      handler: (request, h) => getJson(request.params.id, h),
    })

    // NOTE - CREATE DOCUMENT
    server.route({
      method: 'POST',
      path: '/json',
      handler: (request, h) => postNewJson(request.payload, h),
      config: {
        validate: {
          payload: Joi.object().required(),
          // TODO - friendlier message
          failAction: (request, h, error) => error,
        },
      },
    })

    // NOTE - UPDATE DOC
    server.route({
      method: 'POST',
      path: '/json/{id}',
      handler: (request, h) => postJsonDiff(request.params.id, request.payload, h),
      config: {
        validate: {
          payload: {
            documentId: Joi.string().length(64).required(),
            document: Joi.object().required(),
            changeDate: Joi.number(),
          },
          // TODO - friendlier message
          failAction: (request, h, error) => error,
        },
      },
    })
  },
}

module.exports = routing
