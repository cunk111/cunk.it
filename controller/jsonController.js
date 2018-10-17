import { ObjectId } from 'mongodb'
import db from '../modules/db'
import config from '../config'

const jsonController = {
  validateJson(raw) {
    console.log({ raw }, typeof raw)
    return typeof raw === 'object'
  },

  async getJson(id, req) {
    const _db = db.getDb()
    const doc = await _db.db(config.db.name).collection('file').findOne({ _id: ObjectId(id) })

    _db.close()
    return req.response(doc).code(200)
  },

  postJson(id, body, cb) {
    // console.log('!', id);
    // db.insert(id, body, cb);
  },
}

module.exports = jsonController
