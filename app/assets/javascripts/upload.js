// config as per : https://github.com/danialfarid/angular-file-upload
angular.module('csv').controller('upload', [ '$scope', '$upload', function($scope, $upload) {
  $scope.percent = 0
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
        console.log(data);
      });
    }
  };
}]);
