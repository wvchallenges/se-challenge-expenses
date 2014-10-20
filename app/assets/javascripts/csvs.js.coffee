angular.module('csv', ['ngResource', 'angularFileUpload', 'ui.bootstrap'])

angular.module('csv').factory('Csvfile', [ '$resource', ($resource) ->
  $resource('/csvs/:csvId', {csvId: @id} )
])

angular.module('csv').controller('report', ['$scope','Csvfile', ($scope,Csvfile) ->
  $scope.report = null
  $scope.$on 'update_report', (event, args) ->
    Csvfile.get({csvId:args.id}, (data) ->
      $scope.report = data
    )
])
