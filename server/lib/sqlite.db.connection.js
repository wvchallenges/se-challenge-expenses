/**
 * Created by bharath on 2017-01-13.
 */
'use strict';

var sqlite3 = require('sqlite3').verbose();
var db;

module.exports.getConnection = function() {
    if(!db) {
        //console.log('Creating a database!!');
        db = new sqlite3.Database('./db/we-code-challenge.db');
    }
    return db;
};
