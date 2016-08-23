var app = angular.module('wavetest', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider.state('home', {
      url: '/',
      templateUrl: '/templates/home.html',
      controller: 'homeController'
    });

    $urlRouterProvider.otherwise('/');
  }
]);
