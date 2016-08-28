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
     * Bulk insertion of data using the specified query string
     * 
     * @param {any} queryString
     * @param {any} dataArray
     * @returns {Promise}
     */
    bulkInsert(queryString, dataArray) {
        return new Promise((resolve, reject) => {

            if (dataArray && dataArray.length) {
                this.db.serialize(() => {
                    const stmt = this.db.prepare(queryString);
                    dataArray.forEach(row => stmt.run(row));
                    stmt.finalize((err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            } else {
                reject('dataArray is null or empty');
            }
        });
    }

    /**
     * Run the queryString with the given parameters to select data
     * from the database
     * 
     * @param {any} queryString
     * @param {any} params
     * @returns {Promise}
     */
    select(queryString, params) {
        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                this.db.all(queryString, params, (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
        });
    }
}

