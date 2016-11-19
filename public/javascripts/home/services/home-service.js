(function () {
  'use strict';

  angular
    .module('csv-to-db-app.home.services')
    .factory('Home', Home);

  Home.$inject = ['$http', 'Upload'];


  function Home($http, Upload) {
    /**
     * @name Account
     * @desc The factory to be returned
     * @memberOf thinkster.accounts.services.Account
     */
    var Home = {
      uploadCsv: uploadCsv,
    };

    return Home;

    /////////////////////

    function uploadCsv(file, successfulCallback, errorCallback) {
      Upload.upload({
        url: '/uploadCsv',
        data: {files:file}
      }).then(successfulCallback, errorCallback);
    }
  }
})();
