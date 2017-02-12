/**
 * Services relating to employees
 */
angular.module('myApp').service('employeeService', function($rootScope, $http) {
    console.log("service loaded");
    this.uploadFile = function(metadata, file) {
        return {
            url: $rootScope.uploaderUrl + '/employee/upload',
            method: 'POST',
            data: {
                data : JSON.stringify(metadata),
                file : file !== undefined ? file : null
            }
        };
    };

    this.getJobs = function() {
        var url = $rootScope.uploaderUrl + '/employee/job';
        return $http.get(url);
    };

    this.getJob = function(jobId) {
        var url = $rootScope.uploaderUrl + '/employee/job/' + jobId;
        return $http.get(url);
    };
});
