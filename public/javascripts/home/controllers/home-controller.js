(function () {
  'use strict';

  angular
    .module('csv-to-db-app.home.controllers')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['Home'];

  function HomeController(Home) {
    var vm = this;

    /**
     * GET request to server to fetch data stored in table
     * @return {[type]} [description]
     */
    vm.getTable = function(){
      Home.getTable(function successCallback(response) {
          console.log("getTable success");
          vm.sums = response.data;
          console.log(vm.sums);
        }, function errorCallback(response) {
          console.log("fail");
          return null;
        });
    }

    vm.getTable();

    /**
     * POST request to upload csv file to server
     * @param  {[type]} file    [description]
     * @param  {[type]} errFile [description]
     * @return {[type]}         [description]
     */
    vm.uploadCsv = function (file, errFile){
      Home.uploadCsv(file, function successCallback(response) {
          console.log("uploadCsv success");
          vm.getTable()
        }, function errorCallback(response) {
          console.log("fail");
      });
    }
  }
})();
