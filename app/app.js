'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
  'ui.router',
  'app.controllers',
  'app.services',
  'app.constants'
]).
config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {

  $stateProvider
  // setup an abstract state for the tabs directive
    .state('upload', {
    url: '/upload',
    templateUrl: 'views/upload.html',
    controller: 'UploadCtrl'
  })
}]);


