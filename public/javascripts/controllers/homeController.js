angular.module('wavetest').controller('homeController', ['$scope', 'DataService', 'RequestService', function($scope, DataService, RequestService) {

  $scope.expenseItems = [];
  $scope.expensesByMonth = [];
  $scope.render = {
    result: false,
    failed: false
  };

  $scope.parseFile = function(file) {
    var reader = new FileReader(),
      content, fileData;

    reader.onload = function() {
      content = reader.result;
      fileData = DataService.convertCsv(content);

      RequestService.send(fileData, function(data) {
        $scope.expenseItems = data;
        $scope.expensesByMonth = DataService.expensesByMonth(data);
        $scope.render.result = true;
      }, function() {
        $scope.render.failed = true;
      });
    };

    reader.readAsText(file);
  };

}]);
