import { ObjectId } from 'mongodb'
import m from 'moment'
// import _ from 'lodash'
import db from '../modules/db'
import config from '../config'

const crypto = require('crypto')

// getCommits,
// checkoutCommit,
// newCommit,



const jsonController = {
  async getDocuments(req) {
    console.log('here')
    const _db = db.getDb()
    const doc = await _db.db(config.db.name)
      .collection('file')
      .find({})
      .toArray()

    // TODO - differenciate result / no result
    // TODO - should i return everything ?
    return req.response(doc.map(e => e._id)).code(200)
  },

  async checkoutDocument(id, req) {
    const _db = db.getDb()
    const doc = await _db.db(config.db.name)
      .collection('file')
      .findOne({ _id: ObjectId(id) })

    // TODO - differenciate result / no result
    return req.response(doc).code(200)
  },

  async newDocument(payload, req) {
    const _db = db.getDb()
    const timestamp = m().format('x')
    const data = {
      document: payload,
      changeDate: timestamp,
      documentId: crypto.createHmac('sha256', JSON.stringify(payload))
        .update(JSON.stringify(timestamp)).digest('hex'),
    }

    const res = await _db.db(config.db.name).collection('file').insertOne(data)

    // _db.close()
    return req.response(res.ops).code(200)
  },


  /**
   * BRANCHES Routes
   * - getDocuments
   * - checkoutDocument
   * - newDocument
   */

  async getCommits() {

  },

  async checkoutCommit() {

  },

  async newCommit() {

  }

  // async getLastSnapshop(id) {
  //   console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  //   const _db = db.getDb()
  //
  //   // BUG - destructuring cannot handle null input
  //   const snapshot = await _db.db(config.db.name)
  //     .collection('file')
  //     .findOne({ _id: ObjectId(id) })
  //   console.log('snap searched')
  //   if (!snapshot) {
  //     console.log('no snap found')
  //     // TODO notify caller to send error - and abort!
  //     // _db.close()
  //     return {
  //       error: {
  //         code: 404,
  //         msg: 'document not found',
  //       },
  //     }
  //   }
  //   console.log(snapshot)
  //
  //   const snapList = await _db.db(config.db.name)
  //     .collection('file')
  //     .find({ documentId: snapshot.documentId })
  //     .toArray()
  //
  //   if (snapList.length === 1) {
  //     console.log('one snap')
  //     // _db.close()
  //     return snapList
  //   }
  //   console.log('>9k snaps')
  //   // _db.close()
  //   return snapList.sort((a, b) => parseInt(a.changeDate, 10) - parseInt(b.changeDate, 10)).pop()
  // },
  //
  //
  // async getDiff(original, snapshot) {
  //   console.log('get diff', { original }, { snapshot })
  //   const lastSnap = this.getLastSnapshop()
  //   return 'idle'
  // },
  //
  //
  //
  //
  //
  // async postJsonDiff(id, payload, req) {
  //   // const _db = db.getDb()
  //   console.log('hello?')
  //   const [lastSnap] = await jsonController.getLastSnapshop(id)
  //   console.log('post diff', { lastSnap })
  //   const diff = await jsonController.getDiff(lastSnap, payload.document)
  //   console.log('out of the diff')
  //   // _db.close()
  //   return req.response(lastSnap).code(200)
  // },
}

module.exports = jsonController
