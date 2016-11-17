  var app = angular.module('csv-to-db-app', [
                            'ui.router'
                            ]);
  app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      // Home page
      .state('home', {
        url: '/home',
        templateUrl: 'templates/home/home.html',
      })

    $urlRouterProvider.otherwise('/home');
  }]); // End of app.config
