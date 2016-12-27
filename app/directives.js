(function() {
    'use strict';
    var myApp = angular.module('app');

    myApp.directive('fileModel', function ($parse) {
        return {
            restrict: 'A', //the directive can be used as an attribute only

            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel),
                    modelSetter = model.assign; 

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    });
})();