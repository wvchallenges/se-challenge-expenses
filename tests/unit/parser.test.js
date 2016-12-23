'use strict';

// var expect = require('expect.js');
var expect = require('chai').expect;

describe('middleware/parser', function() {
  it('parses csv', function () {
    var parser = require('../../middleware/parser.js');
    return parser
      .parse('1,2,3,4,5,6,7,8\n12/1/2013,Travel,Don Draper,"783 Park Ave, New York, NY 10021",Taxi ride, 350.00 ,NY Sales tax, 31.06')
      .then(function(value) {

        expect(value[0]).to.deep.equal({
          date: '12/1/2013',
          category: 'Travel',
          employee_name: 'Don Draper',
          employee_address: '783 Park Ave, New York, NY 10021',
          expense_description: 'Taxi ride',
          pretax_amount: '350.00',
          tax_name: 'NY Sales tax',
          tax_amount: '31.06'
        });

      });
  });
});
