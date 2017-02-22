'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
var wave = require('./wave');

server.connection({ port: 3000, host: 'localhost' });

server.start((err) => {

  if (err) {
    throw err;
  }
  
  console.log(`Server running at: ${server.info.uri}`);
});


server.route({
  path: '/expenses',
  method: 'POST',
  handler: wave.createExpenses,
  config: {
    cors: {
      origin: ['*'],
      additionalHeaders: ['cache-control', 'x-requested-with']
    }
  }
});

server.route({
  path: '/expenses',
  method: 'GET',
  handler: wave.readExpenses,
  config: {
    cors: {
      origin: ['*'],
      additionalHeaders: ['cache-control', 'x-requested-with']
    }
  }
});
