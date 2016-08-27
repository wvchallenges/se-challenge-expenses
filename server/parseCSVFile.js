const parse = require('csv-parse/lib/sync');


/**
 * Recieve a csv file as input and return a javascript array of json 
 * objects
 * 
 * @export
 * @param {any} csvBuffer
 */
module.exports = function parseCSVFile(csvBuffer) {
    const parsedCSV = parse(csvBuffer);
    const headers = parsedCSV[0];
    const data = parsedCSV.splice(1);

    // Map the data into an array of JSON objects
    return data.map(row => {
        let rowObj = {};

        // making the assumption that columns will always be in the same order
        // and that each column will always contain data

        rowObj.$Date = new Date(row[0]); // Date
        rowObj.$Category = row[1].trim(); // Category
        rowObj.$EmployeeName = row[2].trim(); // Employee Name
        rowObj.$EmployeeAddress = row[3].trim(); // Employee Address
        rowObj.$ExpenseDescription = row[4].trim(); // Expense Description
        rowObj.$PreTaxAmount = parseFloat(row[5].trim().replace(',', '')); // Pre Tax Amount
        rowObj.$TaxName = row[6].trim(); // Tax Name
        rowObj.$TaxAmount = parseFloat(row[7].trim().replace(',', '')); // Tax Amount

        return rowObj;
    })
}