'use strict';

module.exports = {
  database: process.env.DBNAME,
  username : process.env.DBUSER,
  password : process.env.DBPASSWORD,
  host : process.env.DBHOST,
  dialect: "postgres",
  port : 5432
};
