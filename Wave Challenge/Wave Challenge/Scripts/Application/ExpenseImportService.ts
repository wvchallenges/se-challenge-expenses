namespace ExpenseImport {
    class ExpenseImportService {

        public ImportExpenseFileFromCsv = function (file: any) {
            let promise = $.Deferred();

            // Parse file into JSON
            let jsonImport = Utilities.FileUtility.ParseCsvFileIntoJson(file).then(function (jsonFile) {

                // Send JSON to server for processing
                $.ajax({
                    type: "POST",
                    url: "/api/DataImport/ImportExpenseRecords",
                    data: JSON.stringify(jsonFile),
                    contentType: "application/json", // Thank you Stackoverflow!!!
                    dataType: "json"
                })
                    .done(function (result) {
                        if (result.Success) {
                            promise.resolve(result.ReportData);
                        }
                        else {
                            promise.reject(result.Exception);
                        }
                    });

            });

            return promise;
        }


        private ImportExpenseRecords = function (data) {

        }

        // It is assumed that cells contain either dates or currency
        public ConstructTableContent = function (data: any[]) {
            let content = "";
            let record;
            let amount;
            let timePeriod;

            for (let i = 0; i < data.length; i++) {
                content += "<tr>";
                record = data[i];

                amount = record["Amount"].toString();
                amount = "$" + parseFloat(amount.replace(/,/g, ""))
                            .toFixed(2)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")

                timePeriod = record["Year"] + " " + Utilities.DateTimeUtility.getMonthShortName(record["Month"]);
                    
                content += "<td>" + timePeriod + "</td>";
                content += "<td>" + amount + "</td>";
                                    
                content += "</tr>";
            }

            return content;
        }
    }

    export let Service = new ExpenseImportService();
}