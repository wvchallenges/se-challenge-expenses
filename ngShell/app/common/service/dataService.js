(function() {
    'use strict';

    angular
        .module('app')
        .factory('dataService', ['$http', 'globalInfo', 'Upload', dataService]);

    function dataService($http, globalInfo, Upload) {
        var service = {
            upload: upload,
            fetch: fetch
        };
        return service;
        
        function fetch(serviceMode, done, err) {
            var apiUrl = serviceMode ?  globalInfo.apiUrl_fetch_node : globalInfo.apiUrl_fetch_net;

            $http.get(apiUrl)
                 .then(function(res) {
                     done(res.data);
                 }, function(res) {
                     err(res.statusText);
                 });
        }

        function upload(serviceMode, file, done, err) {                
            if (file) {
                var apiUrl = serviceMode ?  globalInfo.apiUrl_upload_node : globalInfo.apiUrl_upload_net;

                Upload.upload({
                    url: apiUrl,
                    file: file
                }).success(function() {
                    done();
                }).error(function() {
                    err();
                });
            } else 
                done();
        }
    }    
})();
