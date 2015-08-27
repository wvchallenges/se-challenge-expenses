var app = angular.module('uploadApp', []);

app.controller('uploadController', function($scope, $http) {
	
	window.scope = $scope;
	
	$scope.pageTitle = "Upload File";
	
	$scope.messages = {
		current: "",
		fileNotPresentError: "The file seems to be empty. Please select a file and try again.",
		uploadError: "Error contacting the server. Please try again in a few minutes.",
		getTotalsError: "There was a problem retrieving the totals from the server. Please try again in a few minutes.",
		isError: false,
		showLoading: false,
		clear: function() {
			$scope.messages.current = "";
			$scope.messages.isError = false;
		}
	};
	
	$scope.uploadFormMaster = {fileInput: "", fileText: ""};
	
	$scope.uploadForm = angular.copy($scope.uploadFormMaster);
	
	$scope.getTotals = function() {
		$http.get("getTotals")
			.then(function(response) {
							
				console.log(response.data)
				
				$scope.totals = response.data;
								
			}, function(response) {
				$scope.messages.current = $scope.messages.totalsError;
				$scope.messages.isError = true;
			}
		);
	}	
	
	$scope.totals = $scope.getTotals();
	
	$scope.disableReset = function() {
		return ($scope.uploadForm.fileInput == null || $scope.uploadForm.fileInput == undefined || $scope.uploadForm.fileInput == "") && 
			   ($scope.uploadForm.fileText == null || $scope.uploadForm.fileText == undefined || $scope.uploadForm.fileText == "");
	};
	
	$scope.resetAction = function() {
		$scope.uploadForm = angular.copy($scope.uploadFormMaster);	
		$scope.messages.clear();
		$scope.clearFileInput();
	};
	
	$scope.clearFileInput = function() {
		//Clearing the input type="file" manually because it is not supported by angular
		document.getElementById('fileUploadInput').value = "";
		$scope.uploadForm.fileInput = "";
		$scope.uploadForm.fileText = "";
		$scope.myFile = null;
		$scope.$apply();
	}
	
	$scope.onFileInputChange = function(obj) {
		var label = obj.value.replace(/\\/g, '/').replace(/.*\//, '');
		
		$scope.uploadForm.fileInput = obj.value; 
		$scope.uploadForm.fileText = label;
		$scope.$apply();
	}
	
	$scope.submitAction = function(e) {
		
		if(!$scope.myFile) {
			$scope.messages.current = $scope.messages.fileNotPresentError;
			$scope.messages.isError = true;
			return;
		}
		
		$scope.messages.clear();
		$scope.messages.showLoading = true;
		
		var formData=new FormData();
	    formData.append("file", $scope.myFile);
		
		$http.post("uploadRest", formData, {
		        transformRequest: function(data, headersGetterFunction) {
		            return data;
		        },
		        headers: { 'Content-Type': undefined }
	        })
			.then(function(response) {
							
				$scope.messages.current = response.data.message;
				$scope.messages.isError = response.data.error;
				
				$scope.totals = response.data.totals;
				
				$scope.uploadForm = angular.copy($scope.uploadFormMaster);
		    	$scope.messages.showLoading = false;
				
			}, function(response) {
				$scope.messages.current = $scope.messages.uploadError;
				$scope.messages.isError = true;
				$scope.uploadForm = angular.copy($scope.uploadFormMaster);
		    	$scope.messages.showLoading = false;
		    	$scope.clearFileInput();
			}
		);
	}
	
})
//a little hack here because input type="file" is not supported by angular yet
.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
            	
            	scope.onFileInputChange(this);
            	
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);