(function() {
	'use strict';

	angular
		.module('d3', [])
		.factory('d3Service', function(){
	    	return window.d3;
		});

	angular
		.module('d3plus', [])
		.factory('d3PlusService', function(){
	    	return window.d3plus;
		});

	var app = angular.module('ChallengeApp',
	    ['ngMaterial',
	    'd3',
	    'd3plus',
	    'md.data.table',
	    ], function($interpolateProvider) {
        	$interpolateProvider.startSymbol('<%');
        	$interpolateProvider.endSymbol('%>');
    	});

	var delay = (function(){
		var timer = 0;
	  	return function(callback, ms){
	    	clearTimeout (timer);
	    	timer = setTimeout(callback, ms);
	  	};
	})();


	var transformExpenses = function transformExpenses(expenses) {
		var result = [];
		var l = expenses.length;
		while(l--) {
			result.push({
				pre_tax: parseFloat(expenses[l]['pre\-tax_amount']),
				tax_amount: parseFloat(expenses[l]['tax_amount']),
				category: expenses[l].category,
				description: expenses[l].expense_description,
				total: parseFloat(expenses[l]['pre\-tax_amount']) + parseFloat(expenses[l]['tax_amount']),
				employee_address: expenses[l]['employee_address'],
				employee_name: expenses[l]['employee_name']
			});
		}
		return result;
	};

	app.directive('treemap', ['d3Service', 'd3PlusService', '$http', '$window', '$q',
		function(d3, d3plus, $http, $window, $q) {
		    return {
		    	restrict: 'E',
		    	scope : {
		    		identifier: '='
		    	},
		    	link: function(scope, elem, attrs) {
		    		scope.identifier = attrs.identifier;
		    		var queryParams = $window.location.search.slice(1).split('&');
		    		var page = 1;
		    		for(var i = 0; queryParams.length; i++) {
		    			var param = queryParams[i].split('=');
		    			if(param[0].indexOf('page') > -1) {
		    				page = param[1];
		    				break;
		    			}
		    		}

		    		var queryString = page === 1 ? '' : '?page='+page;
		    		$http
		    			.get('/get'+queryString)
		    			.then(function(response) {
							scope.expenseData = transformExpenses(response.data.data.expenseArray.data);
							scope.identifier = attrs.identifier;

							scope.render = function(data, identifier) {
								d3plus
									.viz()
								    .container("treemap") //Contain visualization in directive
								    .data(data)
								    .type("tree_map")
								    .id(identifier)
								    .size("total")
								    .draw();
							};

						    $($window).resize(function () {
							    delay(function() {
					        		scope.render(scope.expenseData, scope.identifier);
							    }, 500);
							});

							scope.render(scope.expenseData, scope.identifier);
						});
		      	}
		    }
		}
	]);

	app.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
		// $scope.expenseData = null;

		// $http
		// 	.get('/get')
		// 	.then(function(response) {
		// 		$scope.expenseData = transformExpenses(response.data);
		// 	}, console.log);

	}]);
}());