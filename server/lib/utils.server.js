/**
 * Created by bharath on 2017-01-18.
 */

module.exports.splitExpenseData = function(expenseData) {
  var expenseDataArray = expenseData.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
  return expenseDataArray;
};
module.exports.parseAmount = parseAmount;

function parseAmount(amountStr) {
    if(!amountStr) {
        //Throw an error;
        return -1;
    }
    return parseFloat(amountStr.replace(/(,|")/g,''));
}

module.exports.calculateTaxRate = function(taxAmount, preTaxAmount) {
    return (taxAmount/preTaxAmount*100).toFixed(2);
};

module.exports.convertDateStringToTimeStamp = function(date) {
    // Date is in the format MM/DD/YYYY
    if(!date) {
        // return appropriate value
        return -1;
    }
    dateArray = date.split('/');
    if(dateArray.length !== 3) {
        return -1;
    }
    var dateObj = new Date(dateArray[2],dateArray[0]-0,dateArray[1],0,0,0,0);
    return dateObj.getTime()/1000;
};
