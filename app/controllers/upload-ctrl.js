angular.module('app.controllers', [])

//top view controller
.controller('UploadCtrl', function($scope, $rootScope, $state, UploadService) {
  $scope.uploadedFile = function(element) {
    console.log('$scope.uploadedFile called');
    $scope.$apply(function($scope) {
      $scope.files = element.files;
      console.log('$scope.uploadedFile', $scope.files);
    });
  }

  $scope.addFile = function() {
    console.log('$scope.addFile', $scope.files);
    UploadService.uploadfile($scope.files)
    .then(function(res) {
      console.log('uploaded successfully');
    })
    .then(undefined, function(err) {
      // DO any UI invocations here (bring up popup/modal etc..)
      console.log('error in upload');
    });
  }
})