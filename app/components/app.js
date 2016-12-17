angular.module('app', ['ui.router',
        'app.addFiles',
        'app.home',
    ])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/index');

    }])
    .controller('navigation', ['$scope', function($scope) {
       
    }]);
