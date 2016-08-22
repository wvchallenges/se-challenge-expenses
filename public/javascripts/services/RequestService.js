angular.module('wavetest').service('RequestService', ['$http', function($http){
  var _this = this;
  this.urls = {
    upload: '/api/upload'
  };

  this.send = function(data, success, fail) {
    $http.post(this.urls.upload, data)
      .then(function(response){
        success(response.data);
      }, function() {
        fail();
      });
  };

}]);
