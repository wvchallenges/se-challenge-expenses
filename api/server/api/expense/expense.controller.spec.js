'use strict';

var moment = require('moment');
var ctrl = require('./expense.controller');

// TODO: add more tests for failures and error handling

describe('Expense Controller:', function() {
  describe('generateSummary', function() {
    var data;

    beforeEach(function() {
      data = [
        { 'expense_date': moment('2015-03-01'),
          'category': 'office expense',
          'employee_name': 'Heisenberg',
          'employee_address': '308 Negra Arroyo Lane',
          'expense_description': 'glassware',
          'pre_tax_amount': 103.00,
          'tax_name': 'GST',
          'tax_amount': 5.15
        },
        { 'expense_date': moment('2015-03-31'),
          'category': 'office expense',
          'employee_name': 'Heisenberg',
          'employee_address': '308 Negra Arroyo Lane',
          'expense_description': 'glassware',
          'pre_tax_amount': 1205.00,
          'tax_name': 'GST',
          'tax_amount': 10.26
        },
        { 'expense_date': moment('2015-02-01'),
          'category': 'office expense',
          'employee_name': 'Heisenberg',
          'employee_address': '308 Negra Arroyo Lane',
          'expense_description': 'glassware',
          'pre_tax_amount': 15.00,
          'tax_name': 'GST',
          'tax_amount': 0.75
        },
      ]
    });

    it('should convert a list of expense records into a monthly summary and in order', function() {
      var result = ctrl.generateSummary(data);
      expect(result.length).equal(2);
      expect(result[0]).eql({ 'month': '2015-02', 'total': '$15.75' });
      expect(result[1]).eql({ 'month': '2015-03', 'total': '$1,323.41' });
    });
  });

  describe('mapData', function() {
    var data;
    beforeEach(function() {
      data = [
        [
          '03/01/2015',
          'office expense',
          'Heisenberg',
          '308 Negra Arroyo Lane',
          'glassware',
          '103.00',
          'GST',
          '5.15'
        ],
        [
          '03/31/2015',
          'office expense',
          'Heisenberg',
          '308 Negra Arroyo Lane',
          'glassware',
          '1,205.00',
          'NoTax',
          '0.01'
        ]
      ];
    });

    it('should 2d array to object array', function() {
      var result = ctrl.mapData(data);

      expect(result.length).equal(2);
      expect(result[0].expense_date.format('YYYY-MM-DD')).equal('2015-03-01');
      expect(result[0].category).equal('office expense');
      expect(result[0].employee_name).equal('Heisenberg');
      expect(result[0].employee_address).equal('308 Negra Arroyo Lane');
      expect(result[0].pre_tax_amount).equal(103.00);
      expect(result[0].tax_name).equal('GST');
      expect(result[0].tax_amount).equal(5.15);
      expect(result[1].expense_date.format('YYYY-MM-DD')).equal('2015-03-31');
      expect(result[1].category).equal('office expense');
      expect(result[1].employee_name).equal('Heisenberg');
      expect(result[1].employee_address).equal('308 Negra Arroyo Lane');
      expect(result[1].pre_tax_amount).equal(1205.00);
      expect(result[1].tax_name).equal('NoTax');
      expect(result[1].tax_amount).equal(0.01);
    });
  });

  describe('parseCsv', function() {

    it('should parse a buffer of csv to 2d array', function() {
      var buffer = new Buffer('col a,col b\nval 1,"val 2"');
      return ctrl.parseCsv(buffer).then((result) => {
        expect(result.length).equal(2);
        expect(result[0].length).equal(2);
        expect(result[1].length).equal(2);

        expect(result[0][0]).equal('col a');
        expect(result[0][1]).equal('col b');
        expect(result[1][0]).equal('val 1');
        expect(result[1][1]).equal('val 2');
      });
    });

  });
});
