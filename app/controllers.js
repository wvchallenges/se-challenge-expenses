(function () {
    'use strict';

    var webservicesUrl = 'http://localhost:4444';

    var myApp = angular.module('app');

    myApp.controller('FileUploadController', function ($scope, fileUploadService, getLatestDataService) {

        $scope.showUpload = true;
        $scope.uploadFile = function () {
            var file = $scope.myFile;
            var uploadUrl = webservicesUrl + "/v1/feedhopper/employeeSpending", 
            promise = fileUploadService.uploadFileToUrl(file, uploadUrl);
            
            $scope.latestData = [];

            promise.then(function (response) {
                $scope.showUpload = false;
                $scope.serverResponseStatus = response;
                var latestDataUrl = webservicesUrl + "/v1/latestEmployeeSpendingData",
                promise = getLatestDataService.getLatestData(latestDataUrl);

                promise.then(function (response) {
                    $scope.latestData = response.payload.data.latestData;

                }, function () {
                    $scope.serverResponse = 'An error has occurred';
                });

            }, function () {
                $scope.serverResponse = 'An error has occurred';
            })
        };

        $scope.getTotal = function(key) {
            var total = 0;

            for(var i=0; i<$scope.latestData[key].length;i++){
                total += parseFloat($scope.latestData[key][i].total);
            }

            return total.toFixed(2);
        }
    });

})();