angular
  .module('appRootModule', [
    'ui.router',
    'common.module',
    'components.module'
  ])
  .constant('REST_URI', 'http://localhost:8080/expense')
  .config(['$stateProvider', function($stateProvider) {
    var uploadState = {
      url: '/upload',
      component: 'upload'
    };
    var resultState = {
      url: '/result',
      component: 'result'
    };
    $stateProvider.state('upload', uploadState);
    $stateProvider.state('result', resultState);
  }]);