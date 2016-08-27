const parse = require('csv-parse/lib/sync');

/**
 * Private function to parse the CSV file into an array
 * of employee expense objects
 */
const parseCSVFile = function (fileBuffer) {
    const parsedCSV = parse(fileBuffer);
    const data = parsedCSV.splice(1); // ignore the headers

    // Map the data into an array of JSON objects
    return data.map(row => {
        let rowObj = {};

        // making the assumption that columns will always be in the same order
        // and that each column will always contain data
        rowObj.date = new Date(row[0]); // Date
        rowObj.category = row[1].trim(); // Category
        rowObj.employeeName = row[2].trim(); // Employee Name
        rowObj.employeeAddress = row[3].trim(); // Employee Address
        rowObj.expenseDescription = row[4].trim(); // Expense Description
        rowObj.preTaxAmount = parseFloat(row[5].trim().replace(',', '')); // Pre Tax Amount
        rowObj.taxName = row[6].trim(); // Tax Name
        rowObj.taxAmount = parseFloat(row[7].trim().replace(',', '')); // Tax Amount

        return rowObj;
    })
}

module.exports = class BusinessLayer {
    /**
     * Creates an instance of BusinessLayer.
     * 
     * @param {DataAccessLayer} dataAccessLayer
     */
    constructor(dataAccessLayer) {
        this._dal = dataAccessLayer;
    }

    /**
     * Upload employee expense files to the database,
     * they are assumed to be csv files in the expected format
     * 
     * @param {any} files
     * @returns {Promise}
     */
    uploadEmployeeExpenseFiles(files) {
        // There may be multiple files uploaded at once, we need to 
        // merge them all into a single array.
        var dataArray = files.reduce((prev, curr) => {
            return prev.concat(parseCSVFile(curr.buffer));
        }, []);

        return this._dal.insertEmployeeExpenseRecords(dataArray);
    }
}