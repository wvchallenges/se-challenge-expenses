angular.module('csv', ['ngResource', 'angularFileUpload', 'ui.bootstrap'])

angular.module('csv').factory('Csvfile', [ '$resource', ($resource) ->
  $resource('/csvs/:csvId', {csvId: @id} )
])

angular.module('csv').controller('report', ['$scope','Csvfile', ($scope,Csvfile) ->
  $scope.report; Csvfile.get({csvId:1}, (data) ->
    $scope.report = data
  )

])

