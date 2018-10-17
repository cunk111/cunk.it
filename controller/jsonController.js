import { ObjectId } from 'mongodb'
import m from 'moment'
import db from '../modules/db'
import config from '../config'

const crypto = require('crypto')

const jsonController = {
  validateJson(raw) {
    console.log({ raw }, typeof raw)
    return typeof raw === 'object'
  },


  async getAllJson(req) {
    const _db = db.getDb()
    const doc = await _db.db(config.db.name)
      .collection('file')
      .find({})
      .toArray()

    console.log(doc)
    _db.close()
    // TODO - differenciate result / no result
    // TODO - should i return everything ?
    return req.response(doc.map(e => e._id)).code(200)
  },


  async getJson(id, req) {
    const _db = db.getDb()
    const doc = await _db.db(config.db.name)
      .collection('file')
      .findOne({ _id: ObjectId(id) })

    _db.close()
    // TODO - differenciate result / no result
    return req.response(doc).code(200)
  },


  async getLastSnapshop(id) {
    const _db = db.getDb()
    const { documentId } = await _db.db(config.db.name)
      .collection('file')
      .findOne({ _id: ObjectId(id) })

    const snapList = await _db.db(config.db.name)
      .collection('file')
      .find({ documentId })
      .toArray()

    return snapList.sort((a, b) => parseInt(a.changeDate, 10) - parseInt(b.changeDate, 10)).pop()
  },


  async getDiff(original, update) {
    // NOTE - Ha! incremental or differential ?
    console.log('get diff', { original }, { update })
  },


  async postNewJson(payload, req) {
    const _db = db.getDb()
    const timestamp = m().format('x')
    const data = {
      document: payload,
      changeDate: timestamp,
      documentId: crypto.createHmac('sha256', JSON.stringify(payload))
        .update(JSON.stringify(timestamp)).digest('hex'),
    }
    // console.log({ data })
    const res = await _db.db(config.db.name).collection('file').insertOne(data)

    _db.close()
    return req.response(res.ops).code(200)
  },


  async postJsonDiff(id, payload, req) {
    const _db = db.getDb()
    // console.log('hello?');
    const lastSnap = await jsonController.getLastSnapshop(id)
    console.log('post diff', { lastSnap })
    const diff = await jsonController.getDiff(lastSnap.document, payload)

    _db.close()
    return req.response(lastSnap).code(200)
  },
}

module.exports = jsonController
