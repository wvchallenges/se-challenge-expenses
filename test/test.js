var assert = require('assert');
var wave = require('../wave');
var dataMock = 'date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount\n12/1/2013,Travel,Don Draper,"783 Park Ave, New York, NY 10021",Taxi ride, 350.00 ,NY Sales tax, 31.06\n12/15/2013,Meals and Entertainment,Steve Jobs,"1 Infinite Loop, Cupertino, CA 95014",Team lunch, 235.00 ,CA Sales tax, 17.63\n12/31/2013,Computer - Hardware,Jonathan Ive,"1 Infinite Loop, Cupertino, CA 95014",HP Laptop, 999.00 ,CA Sales tax, 74.93\n12/14/2013,Computer - Software,Tim Cook,"1 Infinite Loop, Cupertino, CA 95014",Microsoft Office, 899.00 ,CA Sales tax, 67.43\n12/6/2013,Computer - Software,Sergey Brin,"1600 Amphitheatre Parkway, Mountain View, CA 94043",iCloud Subscription, 50.00 ,CA Sales tax, 3.75\n12/9/2013,Computer - Software,Larry Page,"1600 Amphitheatre Parkway, Mountain View, CA 94043",iCloud Subscription, 50.00 ,CA Sales tax, 3.75\n11/10/2013,Meals and Entertainment,Eric Schmidt,"1600 Amphitheatre Parkway, Mountain View, CA 94043",Coffee with Steve, 300.00 ,CA Sales tax, 22.50\n11/12/2013,Travel,Larry Page,"1600 Amphitheatre Parkway, Mountain View, CA 94043",Taxi ride, 230.00 ,CA Sales tax, 17.25\n11/20/2013,Meals and Entertainment,Don Draper,"783 Park Ave, New York, NY 10021",Client dinner, 200.00 ,NY Sales tax, 15.00\n10/4/2013,Travel,Eric Schmidt,"1600 Amphitheatre Parkway, Mountain View, CA 94043",Flight to Miami, 200.00 ,CA Sales tax, 15.00\n10/12/2013,Computer - Hardware,Don Draper,"783 Park Ave, New York, NY 10021",Macbook Air," 1,999.00 ",NY Sales tax, 177.41\n12/9/2013,Computer - Software,Steve Jobs,"1 Infinite Loop, Cupertino, CA 95014",Dropbox Subscription, 15.00 ,CA Sales tax, 1.13\n9/18/2013,Travel,Tim Cook,"1 Infinite Loop, Cupertino, CA 95014",Taxi ride, 200.00 ,CA Sales tax, 15.00\n9/30/2013,Office Supplies,Larry Page,"1600 Amphitheatre Parkway, Mountain View, CA 94043",Paper, 200.00 ,CA Sales tax, 15.00\n12/30/2013,Meals and Entertainment,Larry Page,"1600 Amphitheatre Parkway, Mountain View, CA 94043",Dinner with potential acquisition, 200.00 ,CA Sales tax, 15.00\n1/6/2014,Computer - Hardware,Eric Schmidt,"1600 Amphitheatre Parkway, Mountain View, CA 94043",iPhone, 200.00 ,CA Sales tax, 15.00\n1/7/2014,Travel,Steve Jobs,"1 Infinite Loop, Cupertino, CA 95014",Airplane ticket to NY, 200.00 ,CA Sales tax, 15.00\n2/3/2014,Meals and Entertainment,Jonathan Ive,"1 Infinite Loop, Cupertino, CA 95014",Starbucks coffee, 12.00 ,CA Sales tax, 0.90\n2/18/2014,Travel,Eric Schmidt,"1600 Amphitheatre Parkway, Mountain View, CA 94043",Airplane ticket to NY," 1,500.00 ",CA Sales tax, 112.50';
var csvimport;

describe('Wave Challenge', function() {
  describe('#csvimport()', function() {
    it('verify successful CSV import', function() {
      wave.testParser({
        payload: {
          file: dataMock
        }
      })
      .then(function(csvimport) {
        console.log("IMPORT", csvimport);
        done(assert.equal(19, csvimport.length));
      })
    });
  });
});