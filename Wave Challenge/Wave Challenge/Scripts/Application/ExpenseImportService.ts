namespace ExpenseImport {
    class ExpenseImportService {

        public ImportExpenseFileFromCsv = function (file: any) {

            // Parse file into JSON
            let jsonImport = Utilities.FileUtility.ParseCsvFileIntoJson(file).then(function (jsonFile) {


            // Send JSON to server for processing
                $.post("/api/Imports/ImportExpenseRecords", JSON.stringify(jsonFile));
                // Then
            // Act on result

            });




        }


        private ImportExpenseRecords = function (data) {

        }
    }

    export let Service = new ExpenseImportService();
}