/**
 * Created by sonukapoor on 16-08-18.
 */
(function ()
{
    /*globals angular*/

    angular.module('waveApp').factory('validatorService',
        function ()
        {
            var validatorService = {};

            // function to validate the data in the row. 
            // We will validate the date, pre-tax amount and tax amount        
            validatorService.isValidRow = function (item, rowIndex)
            {
                var date = item["date"];
                var preTaxAmount = item["pre-tax amount"].replace(/\"/g, "").trim();
                var taxAmount = item["tax amount"].replace(/\"/g, "").trim();

                var regEx = new RegExp(/^(?!0\.00)\d{1,3}(,\d{3})*(\.\d\d)?$/);
                var isDateValid = moment(date, 'MM/DD/YYYY').isValid();
                var isPreTaxAmountValid = regEx.test(preTaxAmount);
                var isTaxAmountValid = regEx.test(taxAmount);

                var errors = [];
                if (!isDateValid)
                {
                    errors.push("The " + date + " is invalid.");
                }

                if (!isPreTaxAmountValid)
                {
                    errors.push("The pre tax amount " + preTaxAmount + " is invalid.");
                }

                if (!isTaxAmountValid)
                {
                    errors.push("The tax amount " + taxAmount + " is invalid.");
                }

                var validation = {
                    rowIndex: rowIndex,
                    isRowValid: isDateValid && isPreTaxAmountValid && isTaxAmountValid,
                    errors: errors
                };

                return validation;
            };

            return validatorService;
        });
})();