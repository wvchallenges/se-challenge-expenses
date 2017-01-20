'use strict';

var dbLib = require('../lib/sqlite.db.connection.js'),
    db = dbLib.getConnection();


var employee = {
    employeeId: null,
    name: null,
    address: null
};

module.exports.createEmployeeTable = function() {
    db.run('CREATE TABLE EMPLOYEE (EMPLOYEE_ID INTEGER PRIMARY KEY ASC, EMPLOYEE_NAME TEXT, EMPLOYEE_ADDRESS TEXT)', function(err){
        if(err) {
            console.log('Error in creating employee table!!');
            return;
        }
        //console.log('Created employee table!');
    });
};

module.exports.populate = function(expensesData, callback) {
    db.get('SELECT MAX(EMPLOYEE_ID) AS EMPLOYEE_ID FROM EMPLOYEE',function(err,row){
        if(err) {
            console.log('Error occurred in retrieving values from EMPLOYEE table');
            return;
        }
        db.serialize( function() {
            var startEmployeeId = 0;
            console.log('Row: ', row);
            if (row) {
                //console.log('Rows retrieved from Employee table');
                startEmployeeId = row.EMPLOYEE_ID;
            }
            startEmployeeId++;
            console.log('Start Employee Id: ' + startEmployeeId);
            var stmt = db.prepare('INSERT INTO EMPLOYEE (EMPLOYEE_ID, EMPLOYEE_NAME, EMPLOYEE_ADDRESS) VALUES(?,?,?)');
            var employeeMap = {};
            for (var i = 0; i < expensesData.length; i++) {
                if (typeof employeeMap[expensesData[i].employeeName] !== 'undefined') {
                    expensesData[i].employeeId = employeeMap[expensesData[i].employeeName];
                    continue;
                }

                try {
                    stmt.run(startEmployeeId, expensesData[i].employeeName, expensesData[i].employeeAddress);
                } catch (exception) {
                    console.log('Error in inserting data into EMPLOYEE TABLE', exception);
                    continue;
                }
                employeeMap[expensesData[i].employeeName] = startEmployeeId;
                expensesData[i].employeeId = startEmployeeId++;
            }
            stmt.finalize();

            //printTable();

            if (callback) {
                callback(expensesData);
            }
        });
    });

};

module.exports.printTable = printTable;

function printTable() {
    db.each('SELECT * FROM EMPLOYEE', function(err,row) {
        if(err) {
            console.log('Error in selecting Data from EMPLOYEE TABLE');
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
