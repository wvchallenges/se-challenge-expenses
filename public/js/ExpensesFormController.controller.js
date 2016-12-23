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
      angular.forEach($scope.expenses, function(expense) {
        expense.date = new Date(expense.date);
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
