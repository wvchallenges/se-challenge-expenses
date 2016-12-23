'use strict';

module.exports = {
  database: process.env.DBNAME || 'sean-boilerplate-development',
  storage: "./db.development.sqlite",
  username : process.env.DBUSER,
  password : process.env.DBPASSWORD,
  host : process.env.DBHOST || 'localhost',
  dialect: "sqlite",
  port : 5433
};
