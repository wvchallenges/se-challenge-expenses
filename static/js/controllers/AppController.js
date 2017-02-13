app.controller('AppController', ['$scope', 'Upload', function($scope, Upload) {
	$scope.progress = 0;
	$scope.error = null;
	$scope.expenseSummary = null;

	$scope.reset = function() {
		$scope.progress = 0;
		$scope.error = null;
		$scope.expenseSummary = null;
	};
	$scope.uploadCSV = function() {
		$scope.reset();

		Upload.upload({
			method: 'POST',
			url: '/csvUpload',
			headers: {'Content-Type': 'multipart/form-data'},
			data: {csvFile: $scope.csvfile}
		}).then(function(resp) {
			$scope.expenseSummary = [];

			for (period in resp.data) {
				var dateParts = period.split('/')
			
				$scope.expenseSummary.push({
					'period': new Date(dateParts[0], dateParts[1]-1, 1),
					'expense': resp.data[period]
				});
			}
		}, function(resp) {
			$scope.progress = 0;
			$scope.error = "Failed to upload file. Returned error status: " + resp.status;
		}, function(evt) {
			$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
		});
	};
}]);
