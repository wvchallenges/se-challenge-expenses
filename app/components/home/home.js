// Create controller for addFiles view

// Create module, require angular ui router and config dependencies
angular.module('app.home', ['ui.router', ])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        // Create /index url for view, connect to template view and connect the backend controller
        $stateProvider.state('home', {
            url: '/index',
            templateUrl: 'components/home/home.html',
            // is this right?
            controller: 'HomeController'
        });
        // $urlRouterProvider.otherwise('/index');
    }])
    .controller('HomeController', ['$scope', '$http', function($scope, $http) {

        console.log('Im in the cust controller');

        $scope.sortBy = 'name';
        $scope.reverse = false;
        
        $scope.doSort = function(propName) {
           $scope.sortBy = propName;
           $scope.reverse = !$scope.reverse;
        };

        var getSavedFiles = function(){
            $http.get('/api/files').success(function(res) {
                console.log('res', res);
            $scope.savedFiles = res;
        }).error(function(err){
            console.log(err)
        });
        }
        getSavedFiles();
    }]);


