//bootstrap angular ui, and chartjs for graph results
var app = angular.module('munchmunch', ['ui.bootstrap', 'chart.js']);

app.controller('mainController', function ($scope, $http) {

  //function to parse CSV file using PapaParse whenever file is selected
  $scope.uploadFile = function (event) {
    var files = event.target.files;
    Papa.parse(files[0], {
      complete: function (results) {
        console.log(results);
        //send parsed results to nodejs/expressjs
        postToMongo(results);
      }
    });
  };

  //post http to nodejs server route with JSON data
  function postToMongo(results) {
    var req = {
      method: 'POST',
      url: 'http://127.0.0.1:3000/submit',
      headers: {
        'Content-Type': "application/json"
      },
      data: JSON.stringify(results)
    }
    $http(req).then(function successCallback(response) {
      if (response.data == 'success') {
        //immediately pull results after pushing to database, otherwise could set up new button to do this
        pullMonths();
      } else {
        console.log("failure to connect to MongoDB")
      }
    }, function errorCallback(response) {
      console.log(response);
    });;
  }

  //function to pull aggregrate sum of expense by month/year
  function pullMonths() {
    var req = {
      method: 'GET',
      url: 'http://127.0.0.1:3000/monthlyexpense',
      headers: {
        'Content-Type': "application/json"
      },
    }
    $http(req).then(function successCallback(response) {
      if (response.data) {
        //send response json data to display function
        displayDataOptions(response.data);
      } else {
        console.log("failure")
      }
    }, function errorCallback(response) {
      console.log(response);
    });;
  }

  //toggle angularjs hide for element, pass new data to binding
  function displayDataOptions(monthlyExpense) {
    $scope.monthShow = true;
    $scope.monthlyexpenses = monthlyExpense;
    //clear currently selected file
    clearInput();
    //draw graph with new data
    updateGraph(monthlyExpense);
  }

  //annoying hack for input file type, a change event doesnt detect the same file being selected
  function clearInput() {
    var fileInput = document.querySelectorAll(".fileCSV");
    fileInput[0].value = "";
  }

  //chartjs draw graph 
  function updateGraph(monthlyData) {
    //labels
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    $scope.series = ['Total Expenses 2013 ($)', 'Total Expenses 2014 ($)'];
    //initialize timeline
    var d2013 = new Array(12).fill(0);
    var d2014 = new Array(12).fill(0);
    //populate timeline
    monthlyData.forEach(function (d) {
      if (d._id.year == 2013) {
        d2013[d._id.month - 1] = d.totalAmount.toFixed(2);
      }
      if (d._id.year == 2014) {
        d2014[d._id.month - 1] = d.totalAmount.toFixed(2);
      }
    });
    $scope.data = [
      d2013,
      d2014
    ];
    //graph config
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.options = {
      title: {
        display: true,
        text: 'Monthly Employee Expenses'
      },
      legend: {
        display: true,
        labels: {
          fontColor: 'rgb(50, 50, 50)'
        }
      },
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right'
          }
        ]
      }
    };
  }
});

//directive for detecting change on file input select
app.directive('customOnChange', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeHandler);
    }
  };
});

