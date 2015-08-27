var app = angular.module('uploadApp', []);

app.controller('uploadController', function($scope, $http) {
	$scope.pageTitle = "Upload File";
	
	$scope.messages = {
		current: "",
		empty: "The file seems to be empty. Please select a file and try again.",
		wrongFormat: "Please upload a valid .csv file.",
		isError: false,
		clear: function() {
			$scope.messages.current = "";
			$scope.messages.isError = false;
		}
	};
	
	$scope.uploadFormMaster = {fileInput: "", fileText: ""};
	
	$scope.uploadForm = angular.copy($scope.uploadFormMaster);
	
	$scope.disableReset = function() {
		console.log("2: " + $scope.uploadForm.fileInput);
		console.log("3: " + $scope.uploadForm.fileText);
		return ($scope.uploadForm.fileInput == null || $scope.uploadForm.fileInput == undefined || $scope.uploadForm.fileInput == "") && 
			   ($scope.uploadForm.fileText == null || $scope.uploadForm.fileText == undefined || $scope.uploadForm.fileText == "");
	};
	
	$scope.resetAction = function() {
		$scope.uploadForm = angular.copy($scope.uploadFormMaster);	
		$scope.messages.clear();
	};
	
	$scope.onFileInputChange = function(obj) {
		
		var label = obj.value.replace(/\\/g, '/').replace(/.*\//, '');
		
		console.log("1: " + label);
		
		//$scope.uploadForm.fileInput = label;
		$scope.uploadForm.fileText = label;
		$scope.$apply();
		
		fileselectOn('fileselect', 1, label);
	}
	
	$scope.submitAction = function(e) {
		$('#msg').html('');
    	$('#loading-msg').show();
    	$scope.uploadForm = angular.copy($scope.uploadFormMaster);
	}
	
});

$(document).ready( function() {
    $('#btn-file :file').on('fileselect', fileselectOn);   
});

var fileselectOn = function(event, numFiles, label) {
        
    var input = $(this).parents('#input-group').find(':text');
    var log = numFiles > 1 ? numFiles + ' files selected' : label;
    
    if( input.length ) {
        input.val(log);
    } else {
        if( log ) console.log("error: input size = 0. log=" + log);
    }
    
}