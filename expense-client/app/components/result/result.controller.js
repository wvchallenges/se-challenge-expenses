var ResultController = function($state, ExpenseService) {
  var ctrl = this;
  ctrl.records = [];
  ctrl.statusMessage = '';
  ctrl.isSuccess = false;
  
  // Method to fetch and display monthly expenses.
  ctrl.showExpensesByMonth = function () {
    ExpenseService.viewResult().then(function(resp) {
      if (resp.status === 200) {
        ctrl.isSuccess = true;
        ctrl.statusMessage = 'Report fetched successfully!';
        ctrl.records = resp.data;
      } else {
        ctrl.records = [];
        ctrl.isSuccess = false;
        ctrl.statusMessage = 'Problem! Report could not be fetched from server!';
      }
    }, function() {
      ctrl.records = [];
      ctrl.isSuccess = false;
      ctrl.statusMessage = 'Problem! Report could not be fetched from server!';
    });
  };
  
  // Execute on page load to fetch and display data.
  ctrl.showExpensesByMonth(); 
};

angular.module('components.module').controller('ResultController', ['$state', 'ExpenseService', ResultController]);