angular.module('app.services', [])
  .factory('UploadService', function($http, $window, LOCAL_URL) {
    var service = {
      uploadfile: function(files, success, error) {
        var url = LOCAL_URL;
        console.log('url', url);
        for (var i = 0; i < files.length; i++) {
          var fd = new FormData();
          fd.append("file", files[i]);
        }
        return $http.post(url, fd, {
            withCredentials: false,
            headers: {
              'Content-Type': undefined
            },
            transformRequest: angular.identity
          })
          .success(function(data) {
            console.log(data);
            var table = '<table><tr><th>Month</th><th>Total expense</th></tr>';
            data.response.rows.map(function(expenseMonth) {
              var expense = expenseMonth.sum;
              var month = expenseMonth.txn_month.split('-')[1];
              table += '<tr><th>' + month + '</th><th class="content">' + expense + '</th></tr>';
           });
           table += '</table>';
           $('.response-table').html(table);
           return data;
          })
          .error(function(data) {
            console.log(data);
            throw data;
          });
      }
    };
    return service;
  });