var nav = {
  templateUrl: './common/nav.html',
  controller: 'NavController'
};

angular
  .module('common.module')
  .component('nav', nav);