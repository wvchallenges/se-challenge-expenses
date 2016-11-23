var app = angular.module('sqlGrapher', ['ngMaterial', 'chart.js']);

app.config(function ($mdThemingProvider) {
  	$mdThemingProvider.theme('default')
	    .primaryPalette('pink', {
      		'default': 'A200'})
	    .accentPalette('pink', {
      		'default': '800'});
});


app.controller('uploadCtrl', function ($scope, $http) {
    $scope.upload = function ($csvfile) {
		$scope.content = $csvfile;

    	$http.post(
    		"/upload", 
    		{csvfile: $csvfile})
			   .then(
			       function(res){
			       }, 
			       function(res){
			         // failure callback
			       }
			    );
    };

    $scope.graph = function() {
    	$http.get(
    		"/graph")
			   .then(
			       	function(res){
			       		$scope.labels = res.data[0];
						$scope.series = ['Excluding Tax', 'Including Tax'];
						$scope.data = [
							res.data[1],
							res.data[2]
						];
						$scope.colors = ['#69F0AE', '#FF4081'];
			       	}, 
			       	function(res){}	
			    );
    };
});

app.directive('onReadFile', function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile); 
			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						fn(scope, {$csvfile:onLoadEvent.target.result});
					});
				};
				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
});