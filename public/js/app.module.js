angular.module('app', ['ngRoute']);


angular.module('app').config(function($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl: '/templates/index.html',
      controller: 'TestController'
    })
    .when('/cats', {
      templateUrl: '/templates/cats.html',
      controller: 'TestController'
    });

  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

});
