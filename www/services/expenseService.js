/**
 * Created by sonukapoor on 16-08-18.
 */
(function ()
{
    /*globals angular*/

    angular.module('waveApp').factory('expenseService',
        function ($http)
        {
            var expenseService = {};

            expenseService.createExpense = function (expenses)
            {
                return $http({
                    method: 'POST',
                    dataType: 'jsonp',
                    url: "http://localhost:8000/upload?callback=JSON_CALLBACK",
                    data: expenses,
                    crossDomain: true,
                    xhrFields: {
                        withCredentials: true
                    }
                });
            };

            expenseService.getExpenses = function ()
            {
                return $http.get("http://localhost:8000/expenses");
            };

            return expenseService;
        });
})();