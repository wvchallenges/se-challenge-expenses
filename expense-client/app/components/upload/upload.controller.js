var UploadController = function($state, ExpenseService) {
  var ctrl = this;
  ctrl.isSuccess = true;
  ctrl.statusMessage = 'Error!';
  
  // Method to upload data file.
  ctrl.uploadFile = function () {
    let inputField = window.document.getElementById('expenseFile');
    ExpenseService.uploadFile(inputField).then(function(resp) {
      if (resp.status === 200) {
        ctrl.isSuccess = true;
        ctrl.statusMessage = '';
        
        // Redirect to the result page to display the resulting report.
        $state.go('result');
      } else {
        ctrl.isSuccess = false;
        ctrl.statusMessage = 'Problem! The file upload could not be completed!';
      }
    });
  };
};


angular.module('components.module').controller('UploadController', ['$state', 'ExpenseService', UploadController]);