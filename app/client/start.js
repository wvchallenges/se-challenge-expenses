define(['jquery', 'hbs!csvUploader/resultTable'], function ($, tmplTable) {
  'use strict';
  console.log('start.js: App started.');

  var form = $('.CSVform')[0];

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    sendData();
  });

  function sendData ()  {
    var XHR = new XMLHttpRequest();
    var FD  = new FormData(form);

    XHR.addEventListener("load", function(event) {
      var response = JSON.parse(event.target.response);

      var successMsg = (new Date()).toLocaleTimeString() + ': ' + response.text;
      $('.resultText').toggleClass('error', false).text(successMsg);

      var resultTable = tmplTable({items: [{month: "May", expense: "25.01"}, {month: "June", expense: "50.00"}]});
      $('.resultTable').replaceWith(resultTable);
    });

    XHR.addEventListener("error", function(event) {
      var errMsg = 'Something went wrong.\n' + event.target.responseText;
      $('.resultText').toggleClass('error', true).text(errMsg);
    });

    XHR.open("POST", "/CSVform");

    XHR.send(FD);
  }
});
