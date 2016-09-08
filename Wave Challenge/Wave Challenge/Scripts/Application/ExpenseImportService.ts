namespace ExpenseImport {
    class ExpenseImportService {

        public ImportExpenseFileFromCsv = function (file: any) {

            // Parse file into JSON
            let jsonImport = Utilities.FileUtility.ParseCsvFileIntoJson(file).then(function (jsonFile) {


            // Send JSON to server for processing
                $.ajax({
                    type: "POST",
                    url: "/api/DataImport/ImportExpenseRecords",
                    data: JSON.stringify(jsonFile),
                    success: function () { },
                    contentType: "application/json", // Thank you Stackoverflow!!!
                    dataType: "json"
                });
                

                // Then
            // Act on result

            });




        }


        private ImportExpenseRecords = function (data) {

        }
    }

    export let Service = new ExpenseImportService();
}