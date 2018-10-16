// const db = require('../module/couchbase');

const jsonController = {
  validateJson(raw) {
    console.log({ raw }, typeof raw)
    return typeof raw === 'object'
  },
  getJson(id, callback) {
    // console.log('?', id);
    // db.get(id, () => {
    //   callback();
    // });
  },
  postJson(id, body, callback) {
    // console.log('!', id);
    // db.insert(id, body, callback);
  },
}

module.exports = jsonController
