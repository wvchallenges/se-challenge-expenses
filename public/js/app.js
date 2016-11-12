'use strict'

angular.module('Expenses', [])

.controller("reportCtrl", ['$rootScope', '$http',
    function ($rootScope, $http) {
        $http.get('/api/expenses/report')
        .success(function (response) {
            $rootScope.expenseReport = response
        });
    }
]);