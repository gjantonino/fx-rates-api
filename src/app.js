'use strict'
const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const routes = require('./routes.js');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package.json');

const MongoDBUrl = process.env.NODE_ENV === 'local' ? require('../local/mongodb.js').MONGO_DB_URL : process.env.MONGO_DB_URL;


const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost',
  app: {}
});

const swaggerOptions = {
  info: {
    title: 'Rates API Documentation',
    version: Pack.version,
  },
};


const init = async () => {

  try {
    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      }
    ]);
    await server.register(routes);
    await server.start();
    console.log(`Server listening on ${server.info.uri}`);
    mongoose.connect(MongoDBUrl, {})
      .then(() => { console.log(`Connected to MongoDB`) }, err => { console.log(err) });

  } catch (error) {
    console.log(`Server error: ${error.message}`);
    process.exit(1);
  }
};
init();