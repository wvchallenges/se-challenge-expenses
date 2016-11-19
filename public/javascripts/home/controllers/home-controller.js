(function () {
  'use strict';

  angular
    .module('csv-to-db-app.home.controllers')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['Home'];

  function HomeController(Home) {
    var vm = this;

    vm.uploadCsv = function (file, errFile){
      // console.log(file)
      Home.uploadCsv(file, function successCallback(response) {
          console.log("success");
        }, function errorCallback(response) {
          console.log("fail");
      });
    }
  }
})();
