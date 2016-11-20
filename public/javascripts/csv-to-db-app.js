var app = angular.module('csv-to-db-app', [
                          'ui.router',
                          'ngFileUpload',
                          'csv-to-db-app.home'
                          ]);
app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    // Home page
    .state('home', {
      url: '/home',
      views: {
        '': {templateUrl: 'templates/home/home.html'},

        'upload@home': {
          templateUrl: 'templates/home/upload.html',
          controller: 'HomeController',
          controllerAs: 'vm'
        }
      }
    })

  $urlRouterProvider.otherwise('/home');
}]); // End of app.config
