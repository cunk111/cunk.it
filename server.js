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
