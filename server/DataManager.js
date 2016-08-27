const sqlite3 = require('sqlite3');

const createDatabase = `
    CREATE TABLE EmployeeExpense (
        Date NUMERIC,
        Category TEXT,
        EmployeeName TEXT,
        EmployeeAddress TEXT,
        ExpenseDescription TEXT,
        PreTaxAmount REAL,
        TaxName TEXT,
        TaxAmount REAL
    );
`;

/**
 * DataManager acts as a wrapper for all database access
 */
module.exports = class DataManager {
    constructor() {
        this.db = new sqlite3.Database(':memory:');
    }

    /**
     * Initialize the database and create the necessary tables
     * 
     * @returns Promise
     */
    initialize() {
        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                this.db.run(createDatabase, [], (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        });
    }

    /**
     * Insert rows from the rowArray into the specified table
     * 
     * @param {any} tableName
     * @param {any} rowArray
     * @returns
     */
    insertRows(tableName, rowArray) {

        return new Promise((resolve, reject) => {

            if (rowArray && rowArray.length) {
                
                // assumes that each row has the same properties
                let valuesArray = [];
                for (let prop in rowArray[0]) {
                    if (rowArray[0].hasOwnProperty(prop)) {
                        valuesArray.push('?');
                    }
                }

                const valuesString = valuesArray.join(',');
                var sql = `
                    INSERT INTO 
                        ${tableName} 
                    VALUES
                        (${valuesString})
                `;

                // prepare the above insert statement and run for each row of data
                const stmt = this.db.prepare(sql);
                rowArray.forEach(row => {
                    const values = [];
                    for (let prop in row) {
                        values.push(row[prop]);
                    }
                    stmt.run(values);
                });

                stmt.finalize((err) => {
                    if (err) reject(error);
                    else resolve();
                })
            }
            
        });
    }
}

