function ExpenseService ($http, REST_URI) {
  var service = {
    
    // Backend service endpoints.
    restUriUpload: REST_URI + '/upload',
    restUriResult: REST_URI + '/monthlytotals',
    
    
    // Method to fetch monthly expense report.
    viewResult: function () {
      return $http.get(service.restUriResult).then(function(resp) {
        if (resp.data && resp.data.length > 0) {
          console.log('Fetched ' + resp.data.length + ' monthly records in report.');
        }
        return resp;
      });
    },
    
    
    // Method to upload csv data file.
    uploadFile: function (inputField) {
      var data = new FormData();
      data.append('file', inputField.files[0]);
      var requestHeaders = {
        'Content-Type': undefined,
        'Accept': 'application/json'
      };
      var requestOptions = { headers: requestHeaders };
      return $http.post(service.restUriUpload, data, requestOptions).then(function (resp) {
        if (resp.data && resp.data.length > 0) {
          console.log('Stored ' + resp.data.length + ' expense records from uploaded file.');
        }
        return resp;
      });
    }
    
  };
  
  return service;
}

angular
  .module('components.module')
  .factory('ExpenseService', ['$http', 'REST_URI', ExpenseService]);