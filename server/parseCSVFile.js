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

        rowObj[headers[0].replace(' ', '')] = new Date(row[0]); // Date
        rowObj[headers[1].replace(' ', '')] = row[1].trim(); // Category
        rowObj[headers[2].replace(' ', '')] = row[2].trim(); // Employee Name
        rowObj[headers[3].replace(' ', '')] = row[3].trim(); // Employee Address
        rowObj[headers[4].replace(' ', '')] = row[4].trim(); // Expense Description
        rowObj[headers[5].replace(' ', '')] = parseFloat(row[5].trim().replace(',', '')); // Pre Tax Amount
        rowObj[headers[6].replace(' ', '')] = row[6].trim(); // Tax Name
        rowObj[headers[7].replace(' ', '')] = parseFloat(row[7].trim().replace(',', '')); // Tax Amount

        return rowObj;
    })
}