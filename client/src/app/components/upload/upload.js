/**
 * Controller for uploading files and showing report
 */
angular.module('myApp')
  .controller('UploadCtrl', function UploadCtrl($rootScope, $scope, Upload, employeeService) {

    $rootScope.pageTitle = "Employee Expenses";
    $scope.errorMessage = null;
    $scope.successMessage = null;
    $scope.jobs = null;
    $scope.details = null;
    $scope.progress = 0;
    $scope.currentJob = null;

    function init() {
        $scope.getData();
    }

    $scope.cancelFile = function() {
        $scope.FileSelect = null;
        $scope.File = null;
        $scope.errorMessage = null;
    };

    $scope.selectFile = function(file) {
        $scope.File = file;
        var details = {
            "fileName": file.name
        };

        $scope.upload = Upload.upload(employeeService.uploadFile(details, $scope.File))
            .then(function(resp) {
                console.log(resp);
                $scope.successMessage = "Successfuly Uploaded";
                $scope.errorMessage = null;
                $scope.progress = 0;
                $scope.getData();
            }, function(resp) {
                if (resp.status === 0 || resp.status === -1) {
                    $scope.errorMessage = "No server response";
                    $scope.successMessage = null;
                } else {
                    console.log(resp);
                    $scope.errorMessage = resp.data.message;
                    $scope.successMessage = null;
                }
            }, function(evt) {
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            });
    };

    $scope.getData = function() {
        employeeService.getJobs().success(function(data) {
            $scope.jobs = data;
        }).error(function(data, status, headers, config) {
            if (status === 0) {
                $scope.errorMessage = "No server response";
            } else {
                $scope.errorMessage = data.message;
            }
        });
    };

    $scope.openJobDetailsModal = function(job) {
        $scope.currentjob = job;
        employeeService.getJob($scope.currentjob.jobId).success(function(data) {
            $scope.details = data;
            $('#job-details-modal').modal('show');
        }).error(function(data, status, headers, config) {
            if (status === 0) {
                $scope.errorMessage = "No server response";
            } else {
                $scope.errorMessage = data.message;
            }
        });
    };
    init();
});
