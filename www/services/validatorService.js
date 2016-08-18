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

            validatorService.areColumnsValid = function (item)
            {
                // the following columns must exist in the file. 
                var columns = ["date", "category", "employee name", "employee address", "expense description", "pre-tax amount", "tax name", "tax amount"];
                var nonExistingColumns = [];
                for (var c in columns)
                {
                    if (!item.hasOwnProperty(columns[c]))
                    {
                        nonExistingColumns.push(columns[c]);
                    }
                }    
                
                var errors = [];
                for (var nec in nonExistingColumns)
                {
                    errors.push("The column " + nonExistingColumns[nec] + " is missing from your file.");
                }    
                var validation = {
                    rowIndex: -1,
                    isFileValid: errors.length == 0,
                    errors: errors
                };
                return validation;
            }    

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