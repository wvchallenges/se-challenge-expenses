angular.module('wavetest').directive('fileSelect', ['$parse', function($parse){

  return {
    link: function($scope, element, attrs) {
      var action = $parse(attrs['fileSelect']);

      element[0].addEventListener('change', function(event) {
        $scope.$apply(function(){
          action($scope, { file: event.target.files[0]});
        });
      }, false);
    }
  };
}]);
