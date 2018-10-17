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
    console.log('YO?', id, config.db.name)
    const doc = await _db.db(config.db.name).collection('file').findOne({ _id: ObjectId(id) })
    console.log('doc', doc);
    return req.response(doc).code(200)
  },
  postJson(id, body, cb) {
    // console.log('!', id);
    // db.insert(id, body, cb);
  },
}

module.exports = jsonController
