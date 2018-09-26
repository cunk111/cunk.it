'use strict';

const db = require('../module/couchbase');

const jsonController = {
    getJson(id, callback) {
        db.get(id, () => {
            callback();
        });
    },
    postJons(id, body, callback) {
        db.insert(id, body, callback);
    },
};

module.exports = jsonController;
