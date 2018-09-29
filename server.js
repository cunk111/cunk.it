'use strict';

const hapi = require('hapi');
const routes = require('./routing');

const server = hapi.server({
  port: 3000,
  host: 'localhost',
});

const init = async () => {
  await server.start();
  await server.register(routes);
  console.log(`Server running at: ${server.info.uri}`)
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1)
});

init();


const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
// Connection url
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'test';
// Connect using MongoClient
MongoClient.connect(url, function(err, client) {
  // Use the admin database for the operation
  const adminDb = client.db(dbName).admin();
  // List all the available databases
  adminDb.listDatabases(function(err, dbs) {
    test.equal(null, err);
    test.ok(dbs.databases.length > 0);
    client.close();
  });
});
