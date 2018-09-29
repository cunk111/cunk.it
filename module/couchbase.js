'use strict';

const couchbase = require('couchbase');

let cluster;
let bucket;
const mpgCouchbase = {

    cluster,

    bucket,

    /* +
    / parameter must be an array
    * */
    executeN1QLQuery(query, parameter, callback) {
        query = couchbase.N1qlQuery.fromString(query);
        if (!mpgCouchbase.bucket.connected) mpgCouchbase.bucket = mpgCouchbase.cluster.openBucket(process.env.COUCHBASE_BUCKET_NAME, process.env.COUCHBASE_BUCKET_PASS);
        mpgCouchbase.bucket.query(query, parameter, callback);
    },

    get(key, callback) {
        if (!mpgCouchbase.bucket.connected) mpgCouchbase.bucket = mpgCouchbase.cluster.openBucket(process.env.COUCHBASE_BUCKET_NAME, process.env.COUCHBASE_BUCKET_PASS);
        mpgCouchbase.bucket.get(key, callback);
    },

    getMulti(keys, callback) {
        if (!mpgCouchbase.bucket.connected) mpgCouchbase.bucket = mpgCouchbase.cluster.openBucket(process.env.COUCHBASE_BUCKET_NAME, process.env.COUCHBASE_BUCKET_PASS);
        mpgCouchbase.bucket.getMulti(keys, callback);
    },

    /* +
    / keys is like [{ operation, path, value/delta, options}]
    / key.length must be <= 16
    / options is an object containing the CAS in case of lock
    * */
    mutateIn(id, options, keys, callback) {
        if (!mpgCouchbase.bucket.connected) mpgCouchbase.bucket = mpgCouchbase.cluster.openBucket(process.env.COUCHBASE_BUCKET_NAME, process.env.COUCHBASE_BUCKET_PASS);
        const mutater = mpgCouchbase.bucket.mutateIn(id, options);

        keys.forEach((element) => {
            switch (element.operation) {
                case 'arrayAddUnique':
                    mutater.arrayAddUnique(element.path, element.value, element.options);
                    break;
                case 'arrayAppend':
                    mutater.arrayAppend(element.path, element.value, element.options);
                    break;
                case 'arrayInsert':
                    mutater.arrayInsert(element.path, element.value, element.options);
                    break;
                case 'arrayPrepend':
                    mutater.arrayPrepend(element.path, element.value, element.options);
                    break;
                case 'counter':
                    mutater.counter(element.path, element.delta, element.options);
                    break;
                case 'insert':
                    mutater.insert(element.path, element.value, element.options);
                    break;
                case 'remove':
                    mutater.remove(element.path, element.options);
                    break;
                case 'replace':
                    mutater.replace(element.path, element.value, element.options);
                    break;
                case 'upsert':
                    mutater.upsert(element.path, element.value, element.options);
                    break;
                default:
                    break;
            }
        });

        mutater.execute(callback);
    },

    insert(path, value, options, callback) {
        if (!mpgCouchbase.bucket.connected) mpgCouchbase.bucket = mpgCouchbase.cluster.openBucket(process.env.COUCHBASE_BUCKET_NAME, process.env.COUCHBASE_BUCKET_PASS);
        mpgCouchbase.bucket.insert(path, value, options, callback);
    },

    upsert(path, value, callback) {
        if (!mpgCouchbase.bucket.connected) mpgCouchbase.bucket = mpgCouchbase.cluster.openBucket(process.env.COUCHBASE_BUCKET_NAME, process.env.COUCHBASE_BUCKET_PASS);
        mpgCouchbase.bucket.upsert(path, value, callback);
    },

    /* +
    / keys is like [{ operation, path, options}]
    * */
    lookupIn(id, keys, callback) {
        if (!mpgCouchbase.bucket.connected) mpgCouchbase.bucket = mpgCouchbase.cluster.openBucket(process.env.COUCHBASE_BUCKET_NAME, process.env.COUCHBASE_BUCKET_PASS);
        const lookuper = mpgCouchbase.bucket.lookupIn(id);

        keys.forEach((element) => {
            switch (element.operation) {
                case 'exists':
                    lookuper.exists(element.path, element.options);
                    break;
                case 'get':
                    lookuper.get(element.path, element.options);
                    break;
                case 'getCount':
                    lookuper.getCount(element.path, element.options);
                    break;
                default:
                    break;
            }
        });

        lookuper.execute(callback);
    },

    /* +
    / options is an object containing `lockTime` value in seconds
    * */
    getAndLock(key, options, callback) {
        if (!mpgCouchbase.bucket.connected) mpgCouchbase.bucket = mpgCouchbase.cluster.openBucket(process.env.COUCHBASE_BUCKET_NAME, process.env.COUCHBASE_BUCKET_PASS);
        mpgCouchbase.bucket.getAndLock(key, options, callback);
    },

    unlock(key, cas, callback) {
        if (!mpgCouchbase.bucket.connected) mpgCouchbase.bucket = mpgCouchbase.cluster.openBucket(process.env.COUCHBASE_BUCKET_NAME, process.env.COUCHBASE_BUCKET_PASS);
        mpgCouchbase.bucket.unlock(key, cas, callback);
    },

    remove(key, callback) {
        if (!mpgCouchbase.bucket.connected) mpgCouchbase.bucket = mpgCouchbase.cluster.openBucket(process.env.COUCHBASE_BUCKET_NAME, process.env.COUCHBASE_BUCKET_PASS);
        mpgCouchbase.bucket.remove(key, callback);
    },
};

module.exports = mpgCouchbase;
