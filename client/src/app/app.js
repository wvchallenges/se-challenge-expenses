/**
 * @author Alexander Snurnilkov
 */

angular.module('myApp', [
    'ngRoute',
    'ngFileUpload'
])

.run(function($rootScope) {
    $rootScope.envName = envConfig.envName;
    $rootScope.applicationVersion = envConfig.version;
    $rootScope.currentDate = new Date();
    $rootScope.uploaderUrl = envConfig.uploaderUrl;
})

.config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {
        $routeProvider
        .when('/', {
            redirectTo: '/uploader'
        })
        .when('/uploader', {
            templateUrl: 'app/components/upload/upload.html',
            controller: 'UploadCtrl'
        })
        .when('/404', {
            templateUrl: 'app/components/404/404.html'
        })
        .otherwise({
            redirectTo: '/404'
        });
    }
]);
