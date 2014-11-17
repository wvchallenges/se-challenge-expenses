define(['jquery', 'hbs!csvUploader/main', 'hbs!csvUploader/resultTable'],
function ($, tmplMain, tmplTable) {
  'use strict';

  var $$ = function (selection) { return $(selection, '.csvUploader'); };
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];


  function _init (parentElem) {
    parentElem.append(tmplMain());
    var form = $$('.CSVform')[0];

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      sendData(form, displayResult, displayError);
    });
  }


  function sendData (form, successHandler, errorHandler)  {
    var XHR = new XMLHttpRequest();
    var FD  = new FormData(form);

    XHR.addEventListener("load", successHandler);
    XHR.addEventListener("error", errorHandler);
    XHR.open("POST", "/CSVform");
    XHR.send(FD);
  }


  function displayResult (event) {
    var response = JSON.parse(event.target.response);

    var successMsg = (new Date()).toLocaleTimeString() + ': ' + response.text;
    $$('.resultText').toggleClass('error', false).text(successMsg);

    var resultTable = tmplTable({items: formatExpenses(response.mExpenses)});
    $$('.resultTable').replaceWith(resultTable);
  }

  function displayError (event) {
    var errMsg = 'Something went wrong.\n' + event.target.responseText;
    $$('.resultText').toggleClass('error', true).text(errMsg);
  }


  function formatExpenses (mExpenses) {
    return mExpenses.map(function (item) {
      var itemDate = new Date(item.month);
      return {
        month: monthNames[itemDate.getMonth()] + ' ' + itemDate.getFullYear(),
        expense: item.expense.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      };
    });
  }

  return {
    render: _init
  };
});
