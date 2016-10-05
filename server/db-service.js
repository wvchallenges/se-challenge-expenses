/*
This service file connects and queries the Postgres Database
*/
var logger = require('tracer').console();
var pg = require('pg');
var Pool = pg.Pool;
var Promise = require('bluebird');
var conString = process.env.DB_CONN_STR;

var dbService = (function() {
  return {
    query: function(text, values) {
      return new Promise(function(resolve, reject) {
        pg.connect(conString, function(err, client, done) {
         if(err) {
           logger.log('err in db-service pg.connect', err);
           reject(err);
         } else {
           client.query(text, values, function(err, result) {
             if(err) {
               logger.log('err in db-service client-query', err);
               reject(err);
             } else {
               done();
               resolve(result);
             }
           });
         }
        });
      });
  }
};
})();

module.exports = dbService;