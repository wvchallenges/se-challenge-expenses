'use strict';
var dbLib = require('../lib/sqlite.db.connection.js'),
    db = dbLib.getConnection(),
    utils = require('../lib/utils.server');

var tax = {
    taxId: null,
    taxName: null,
    taxRate: null,
    effectiveFrom: null,
    endedOn: null
};

module.exports.createTaxTable = function(name, address) {
    db.run('CREATE TABLE TAX (TAX_ID INTEGER PRIMARY KEY ASC, TAX_NAME TEXT, TAX_RATE REAL, EFFECTIVE_FROM NUMERIC, ENDED_ON NUMERIC)', function(err){
        if(err) {
            console.log('Error in creating tax table!!');
            return;
        }
        //console.log('Created tax table!');
    });
};

module.exports.populate = function(expensesData, res, callback) {
    db.get('SELECT MAX(TAX_ID) AS TAX_ID FROM TAX',function(err,row) {
        if(err) {
            console.log('Error in retrieving max tax id from TAX table');
            return;
        }
        db.serialize( function(){
            var startTaxId = 0;
            if(row) {
                //console.log('Row retrieved from TAX table');
                startTaxId = row.TAX_ID;
            }
            startTaxId++;
            //console.log('Start TAX Id: ' + startTaxId);
            var taxMap = {};
            var insertStmt = db.prepare('INSERT INTO TAX (TAX_ID, TAX_NAME, TAX_RATE, EFFECTIVE_FROM, ENDED_ON) VALUES(?,?,?,?,?)');
            var updateStmt = db.prepare('UPDATE TAX SET ENDED_ON = ? WHERE TAX_ID = ?');
            for (var i = 0; i < expensesData.length; i++) {
                if(expensesData[i].preTaxAmount === 0) {
                    continue;
                }
                var taxRate = (expensesData[i].taxAmount/expensesData[i].preTaxAmount*100).toFixed(2);
                if(typeof taxMap[expensesData[i].taxName] === 'undefined') {
                    try {
                        insertStmt.run(startTaxId,expensesData[i].taxName,taxRate,expensesData[i].date,utils.convertDateStringToTimeStamp('12/31/2099'));
                    } catch (exception) {
                        // put in code to handle exception appropriately
                        console.log('Error in inserting data into TAX TABLE', exception);
                        continue;
                    }
                    taxMap[expensesData[i].taxName] = [{taxId: startTaxId, taxRate: taxRate}];
                    expensesData[i].taxId = startTaxId++;

                } else {
                    var taxDetailsArray = taxMap[expensesData[i].taxName];
                    if(taxDetailsArray.length > 0 && taxDetailsArray[taxDetailsArray.length-1].taxRate === taxRate) {
                        expensesData[i].taxId = taxDetailsArray[taxDetailsArray.length-1].taxId;
                        continue;
                    }

                    // Update old tax rate with ended date as date of the expense record
                    try {
                        updateStmt.run(expensesData[i].date, taxDetailsArray[taxDetailsArray.length-1].taxId);
                    } catch (exception) {
                        // put in code to handle exception appropriately
                        console.log('Error in updating data in TAX TABLE', exception);
                        continue;
                    }

                    // Insert new rate with effective date as date of the expense record
                    try {
                        insertStmt.run(startTaxId,expensesData[i].taxName,taxRate,expensesData[i].date,utils.convertDateStringToTimeStamp('12/31/2099'));;
                    } catch (exception) {
                        // put in code to handle exception appropriately
                        console.log('Error in inserting data into TAX TABLE', exception);
                        continue;
                    }
                    expensesData[i].taxId = startTaxId;
                    taxMap[expensesData[i].taxName] = [{taxId: startTaxId++, taxRate: taxRate}];
                }
            }
            try {
                insertStmt.finalize();
                updateStmt.finalize();
            } catch (exception) {
                // put in code to handle exception appropriately
                console.log('Error in inserting / updating data in TAX TABLE', exception);
            }

            printTable();

            if(callback) {
                callback(expensesData,res);
            }
        });
    });
};

module.exports.printTable = printTable;

function printTable() {
    db.each('SELECT * FROM TAX', function(err,row) {
        if(err) {
            console.log('Error in selecting Data from TAX TABLE');
            return;
        }
        console.log('row: ' , row);
    }, function(err,cntx) {
        if (err) {
            console.log('Error while completing select statement');
            return;
        }
        console.log('Number of rows retrieved: ' + cntx);
    });
}

