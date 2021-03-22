'use strict'
const Hapi = require('@hapi/hapi');
const mongoose =  require('mongoose');
const routes = require('./routes.js');

const MongoDBUrl = 'mongodb+srv://fx-api:fxratesdemo@cluster0.fug6j.mongodb.net/fxRatesDb?retryWrites=true&w=majority'

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost',
  app: {}
});

const init = async () => {

  try {
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