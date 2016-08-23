angular.module('wavetest').service('DataService', [function($http, Upload){

  this.convertCsv = function(input) {
    return Papa.parse(input, {header: true}).data;
  };

  this.expensesByMonth = function(input) {
    var result = [];

    input.forEach(function(item) {
      var date = new Date(item.date),
        month = date.getMonth() + 1,
        year = date.getFullYear(),
        dataObj = {},
        currentItem = result[result.length - 1];

      if (!currentItem ||
        currentItem.month != month ||
        currentItem.year != year) {

        dataObj = {
          month: month,
          year: year,
          preTax: 0,
          tax: 0,
          afterTax: 0,
          data: []
        };

        result.push(dataObj);
        currentItem = result[result.length - 1];

      }

      currentItem.preTax += parseFloat(item.preTaxAmount);
      currentItem.tax += parseFloat(item.taxAmount);
      currentItem.afterTax += parseFloat(item.preTaxAmount) + parseFloat(item.taxAmount);
      currentItem.data.push(item);
    });

    return result;
  };

}]);
