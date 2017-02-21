'use strict'

var Boom = require('boom');
var pgp = require('pg-promise')();
var db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'wave',
  user: process.env.PG_USER ? process.env.PG_USER : '',
  password: process.env.PG_PASS ? process.env.PG_PASS : ''
});
var csv = require('csv');


module.exports = {
  
  createExpense: function(request, reply) {
    // validation
    if (!request.payload.file) {
      reply("Error: file contains no data"); 
    }
    
    var input;
    var inputArray = [];
    var promiseList = [];
    var dateArr;
    
    csv.parse(request.payload.file, {}, function(err, csvInput) {
      // validate entire CSV file before an attempt to save data to DB occurs
      try {
        if (err) {
          // some library issue with parsing the CSV
          throw err;
        }
        
        for (var i=0; i < csvInput.length; i++) {
          if (i > 0) {  // don't validate header line
            // convert date input to ISO 8601 standard
            dateArr = csvInput[i][0].split("/");
            csvInput[i][0] = dateArr[2] + "-" + dateArr[0] + "-" + dateArr[1];
            
            csvInput[i][5] = parseFloat(csvInput[i][5]);
            csvInput[i][7] = parseFloat(csvInput[i][7]);
            
            inputArray.push(csvInput[i]);
      
            // better validation is needed here, but this is a basic PoC
            if (!csvInput[i][0].match(/[0-9]{4}-[0-9]+-[0-9]+/)) {
              throw Boom.badRequest("Your CSV file contains an invalid date");
            }
            else if (!parseFloat(csvInput[i][5])) {
              throw Boom.badRequest("Your CSV file contains an invalid pre-tax amount");
            }
            else if (!parseFloat(csvInput[i][7])) {
              throw Boom.badRequest("Your CSV file contains an invalid tax amount");
            }
          }
        }
        
        db.tx(function (t) {
          // no validation issues, now save to DB by starting a transaction 
          inputArray.forEach(function(validInput) {
            promiseList.push(db.one('INSERT INTO expenses(date, category, employee_name, employee_address, expense_description, pre_tax_amount, tax_name, tax_amount) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id', validInput))  
          });
          return t.batch(promiseList);
        })
        .then(function(data) {
          reply(data);
        })
        .catch(function(err) {
          // rollback
          console.log(err);
          reply(Boom.badImplementation(err));
        });
      }
      catch(e) {
        reply(e);
      }   
    });
   
    
  }
  
}