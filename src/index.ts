'use strict';

// TODO - migrate from gulp to webpack or investigate gulp build method (via ts-loader)
// TODO - see pm2 also?

import hapi = require('hapi');

const server = hapi.server({
  port: 3000,
  host: 'localhost',
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'Hello, world!';
  },
});

const init = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
