'use strict';

var csvParse = require('csv-parse');
var Q = require('q');

// TODO more error checking
function parse(csv) {
  var deferred = Q.defer();
  csvParse(csv, {
    trim: true,
    comment: '#',
    columns: function() {
      return ['date',
              'category',
              'employee_name',
              'employee_address',
              'expense_description',
              'pretax_amount',
              'tax_name',
              'tax_amount'];
    }
  }, function(error, output) {
    if (error) {
      deferred.reject(new Error(error));
    }
    deferred.resolve(output);
  });
  return deferred.promise;
};

module.exports = {
  parse: parse
};
