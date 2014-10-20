angular.module('csv', ['ngResource', 'angularFileUpload', 'ui.bootstrap'])

angular.module('csv').factory('Csvfile', [ '$resource', ($resource) ->
  $resource('/csvs/:csvId', {csvId: @id} )
])

angular.module('csv').controller('report', ['$scope','Csvfile', ($scope,Csvfile) ->

  # captured from Wave Accounting software
  $scope.colors = [
    'rgb(190,78,71)'
    'rgb(233,213,62)'
    'rgb(118,178,211)'
    'rgb(148,213,44)'
    'rgb(41,57,67)'
    'rgb(241,239,207)'
    'rgb(0,128,143)'
    'rgb(107,214,209)'
    'rgb(211,84,76)'
    'rgb(132,109,57)'
  ]

  $scope.report = null

  $scope.get_width = (current) ->
    "#{current / $scope.report.highest_month_total * 100}%"

  $scope.randomize_color = (idx) ->
    #angular related bug not letting me use randomization, won't investigate now
    #implementing a workaround
    $scope.colors[parseInt(new String(idx).slice(-1))]

  $scope.$on 'update_report', (event, args) ->
    Csvfile.get({csvId:args.id}, (data) ->
      $scope.report = data
    )
])
