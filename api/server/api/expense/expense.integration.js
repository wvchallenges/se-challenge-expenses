'use strict';

var app = require('../..');
var request = require('supertest');

var sqldb = require('../../sqldb');
var Expense = sqldb.Expense;

var _ = require('lodash');

describe('Expense API:', function() {

  describe('POST /api/expense/import', function() {

    beforeEach(function() {
      return Expense.truncate();
    });

    it('should respond with monthly expense data', function(done) {
      return request(app)
        .post('/api/expenses/import')
        .attach('data', 'data_example.csv')
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          expect(res.status).equal(200);
          expect(res.body).ok;

          expect(res.body).eql([
            { month: '2013-09', total: '$430.00' },
            { month: '2013-10', total: '$2,391.41' },
            { month: '2013-11', total: '$784.75' },
            { month: '2013-12', total: '$3,012.68' },
            { month: '2014-01', total: '$430.00' },
            { month: '2014-02', total: '$1,625.40' }
          ]);
          done();
        });
    });

  });

});
