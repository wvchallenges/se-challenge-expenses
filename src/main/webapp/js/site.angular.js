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
		return ($scope.uploadForm.fileInput == null || $scope.uploadForm.fileInput == undefined || $scope.uploadForm.fileInput == "")&& 
			   ($scope.uploadForm.fileText == null || $scope.uploadForm.fileText == undefined || $scope.uploadForm.fileText == "");
	};
	
	$scope.resetAction = function() {
		$scope.uploadForm = angular.copy($scope.uploadFormMaster);	
		$scope.messages.clear();
	};
	
	$scope.onFileInputChange = function(obj) {
		console.log('auei!');
		console.log(obj);
	}
	
});

$(document).on('change', '#btn-file :file', function() {
	var input = $(this);
	var numFiles = input.get(0).files ? input.get(0).files.length : 1;
	var label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
	input.trigger('fileselect', [numFiles, label]);
});

$(document).ready( function() {
    $('#btn-file :file').on('fileselect', function(event, numFiles, label) {
        
        var input = $(this).parents('#input-group').find(':text');
        var log = numFiles > 1 ? numFiles + ' files selected' : label;
        
        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }
        
    });
    
    $('#btn-upload').click(function(e) {
    	$('#msg').html('');
    	$('#loading-msg').show();    	
    });
    
});