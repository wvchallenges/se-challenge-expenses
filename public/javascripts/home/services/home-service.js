(function () {
  'use strict';

  angular
    .module('csv-to-db-app.home.services')
    .factory('Home', Home);

  Home.$inject = ['$http', 'Upload'];


  function Home($http, Upload) {
    /**
     * @name Home
     * @desc factory for handling $http requests
     */
    var Home = {
      uploadCsv : uploadCsv,
      getTable : getTable
    };

    return Home;

    /////////////////////

    function uploadCsv(file, successfulCallback, errorCallback) {
      Upload.upload({
        url: '/uploadCsv',
        data: {files:file}
      }).then(successfulCallback, errorCallback);
    }

    function getTable(successfulCallback, errorCallback) {
      $http({
        method : 'GET',
        url : '/table'
      }).then(successfulCallback, errorCallback);
    }
  }
})();
