(function ()
{
    /*globals angular*/
    /*globals $*/
    'use strict';
    var app = angular.module('waveApp', ['ngFileUpload']);

    app.controller("uploader", function (
        $scope,
        $q, 
        csvToJsonService,
        validatorService,
        expenseService)
    {
        $scope.validations = [];
        $scope.processFile = function (file, errFiles)
        {
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file)
            {
                convertCSVToJson().then(uploadCSVData);
            }
        };

        var uploadCSVData = function (data)
        {
            var validExpenses = data.filter(function (item)
            {
                return item.isValidRow;
            }); 

            var invalidExpenses = data.filter(function (item)
            {
                return !item.isValidRow;
            }); 

            $scope.importedRowsCount = validExpenses.length;
            $scope.totalRowsCount = data.length;
            $scope.failedRowsCount = invalidExpenses.length;

            expenseService.createExpense(validExpenses).then(function ()
            {
                $scope.dataImported = true;
                expenseService.getExpenses().then(function (result)
                {
                    $scope.expenses = result.data;
                }); 
            });
        }; 

        var convertCSVToJson = function ()
        {
            var q = $q.defer();
            var reader = new FileReader();
            reader.readAsText($scope.f);
            reader.onloadend = function (e)
            {
                var data = csvToJsonService.toJSON(e.target.result);
                var total_count = data.length - 1;
                var taxInfo = [];
                for (var i = 0; i <= total_count; i++)
                {
                    var validation = validatorService.isValidRow(data[i], i);
                    if (!validation.isRowValid)
                    {
                        $scope.validations.push(validation);
                    }
                    var item = {
                        "date": data[i]["date"],
                        "category": data[i]["category"],
                        "employee name": data[i]["employee name"],
                        "employee address": data[i]["employee address"],
                        "expense description": data[i]["expense description"],
                        "pre-tax amount": data[i]["pre-tax amount"],
                        "tax name": data[i]["tax name"],
                        "tax amount": data[i]["tax amount"],
                        "isValidRow": validation.isRowValid
                    };
                    taxInfo.push(item);
                }
                q.resolve(taxInfo);
            }
            return q.promise;
        }
    });
})();