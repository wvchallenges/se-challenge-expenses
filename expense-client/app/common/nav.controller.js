function NavController ($state) {
  var ctrl = this;
  
  ctrl.operations = [
    {
      label: 'Upload a data file',
      state: 'upload'
    },
    {
      label: 'View expense report',
      state: 'result'
    }
  ];
  
  ctrl.navigateTo = function (destination) {
    $state.go(destination);
  }
}

angular
  .module('common.module')
  .controller('NavController', ['$state', NavController]);