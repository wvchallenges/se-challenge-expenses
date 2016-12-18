waveApp.controller('WaveCtrl', ['$scope','$http',function($scope,$http) {
   $scope.loadingBar = true;
   $scope.showTable = true;

   $scope.uploadFile = function(){
        $scope.loadingBar = false;
        var file = $scope.myFile;
        var uploadUrl = "/api/upload/file";
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl,fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .then(function(ret){
            $scope.items = ret.data;
            $scope.loadingBar = true;
            $scope.showTable = false;
            console.log("success!!");
        },function(){
            $scope.loadingBar = true;
            $scope.showTable = false;
            alert("failed to upload files");
            console.log("error!!");
        });
     };
}]);