import {
  getDocuments,
  checkoutDocument,
  newDocument,

  // getBranches,
  // checkoutBranch,
  // newBranch,

  getCommits,
  checkoutCommit,
  newCommit,
} from './controller/jsonController'

const Joi = require('joi')

const routing = {
  name: 'routing',
  version: '1.0.0',
  async register(server, options) {
    console.log({ options })

    // NOTE - API QUICK REF
    server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        // TODO - move to a page
        // eslint-disable-next-line
        const data = 'Hey! Glad zefffzerzeyou made it here'
        return h.response(data).code(200)
      },
    })

    // NOTE - GET all available docs
    server.route({
      method: 'GET',
      path: '/docs',
      handler: (request, h) => getDocuments(h),
    })

    // NOTE - checkout on given doc
    server.route({
      method: 'GET',
      path: '/doc/{doc_id}',
      handler: (request, h) => checkoutDocument(h),
    })

    // // NOTE - GET all available commits for given doc
    server.route({
      method: 'GET',
      path: '/doc/{doc_id}/commits',
      handler: (request, h) => getCommits(h),
    })

    // NOTE - checkout on given commit
    server.route({
      method: 'GET',
      path: '/doc/{doc_id}/commit/{commit_id}',
      handler: (request, h) => checkoutCommit(request.params.id, h),
    })

    // NOTE - POST new document
    server.route({
      method: 'POST',
      path: '/doc',
      handler: (request, h) => newDocument(request.payload, h),
      config: {
        validate: {
          payload: Joi.object().required(),
          // TODO - friendlier message
          failAction: (request, h, error) => error,
        },
      },
    })

    // NOTE - POST new commit
    server.route({
      method: 'POST',
      path: '/commit',
      handler: (request, h) => newCommit(request.params.id, request.payload, h),
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
