'use strict';

module.exports = {
  database: process.env.DBNAME || 'sean-boilerplate-test',
  storage: "./db.test.sqlite",
  username : process.env.DBUSER || 'tprost',
  password : process.env.DBPASSWORD || 'qweqwe',
  host : process.env.DBHOST || 'localhost',
  dialect: "sqlite",
  port : 5433
};
