angular.module('app').controller('ExpensesFormController', function($http, $scope) {

  $scope.data = {};

  $scope.error = null;
  $scope.submitted = false;

  this.submit = function() {

    var data = new FormData();
    data.append('csv_file', $scope.data.file);
    return $http({
      method: 'POST',
      url: '/api/expenses',
      data: data,
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined
      }
    }).then(function(res) {
      $scope.expenses = res.data.expenses;
      $scope.months = res.data.months;
      angular.forEach($scope.months, function(month) {
        month.date = new Date(month.date);
      });
      return $scope.expenses;
    }).then(function(expenses) {
      $scope.submitted = true;
      $scope.error = null;
    }, function(error) {
      $scope.error = error.data.error;
    }).finally(function() {

    });
  };

});
