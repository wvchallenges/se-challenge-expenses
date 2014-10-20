// config as per : https://github.com/danialfarid/angular-file-upload
angular.module('csv').controller('upload', [ '$scope', '$upload', 'Csvfile', 
  function($scope, $upload, Csvfile) {
  $scope.percent = 0
  $scope.filename = "";
  $scope.is_open = true; // fixes Angular UI bug

  $scope.refreshFiles = function() { 
    Csvfile.query({}, function(data) { 
      $scope.files = data;
    });
  }
  $scope.refreshFiles();

  $scope.onSelect = function($item) {  
    $scope.filename = $item.name;
    $scope.$root.$broadcast('update_report', {id: $item.id });
  };

  $scope.onFileSelect = function($files) {
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      $scope.percent = 10;
      $scope.upload = $upload.upload({
        url: 'csvs', 
        method: 'POST',
        data: {myObj: $scope.myModelObj},
        file: file, 
      }).progress(function(evt) {
        $scope.percent = parseInt(100.0 * evt.loaded / evt.total);
      }).success(function(data, status, headers, config) {
        $scope.percent = 0;
        $scope.$root.$broadcast('update_report', {id: data.id });
        $scope.refreshFiles();
      });
    }
  };
}]);
