(function() {
    'use strict';
    
    var app = angular.module('app', ['ng', 'ui.router', 'ui.bootstrap', 'ngFileUpload']);
    app.config(['$stateProvider', '$urlRouterProvider', config]);    
    
    function config($stateProvider, $urlRouterProvider) {               
        $stateProvider
            .state('home', {
                url: '',
                templateUrl: 'app/home/home.html',
                controller: 'HomeController as vm',
                resolve: {
                }
            })
            .state('challenge', {
                url: 'challenge',
                templateUrl: 'app/challenge/challenge.html',
                controller: "ChallengeController as vm",
                resolve: {
                }
            });          

        $urlRouterProvider.otherwise('');
    }

    app.directive('convertToNumber', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(val) {
                    return parseInt(val, 10);
                });
                ngModel.$formatters.push(function(val) {
                    return '' + val;
                });
            }
        };
    });
})();