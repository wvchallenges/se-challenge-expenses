namespace ExpenseImport {
    export let FileName = "";

    export function OnFileInputChange() {
        if (this.files.length > 0) {
            FileName = this.files[0].name;
            let message = "'" + FileName + "' is ready to be imported";
            $("#fileName").html(message).removeClass("hide");;
            $("#inputFileButton").removeClass("btn-primary").addClass("btn-default");
            $("#importFile").removeClass("hide");


            $("#expenseReport").addClass("hide");
        }
        else {
            $("#fileName").html("").addClass("hide");
            $("#inputFileButton").removeClass("btn-default").addClass("btn-primary");
            $("#importFile").addClass("hide");
        }

    }

    export function HandleFileImport() {
        ToggleSpinner()
        let files = (<HTMLInputElement>$("#sourceFileInput")[0]).files;

        if (files.length > 0) {
            let file = files[0];
            Service.ImportExpenseFileFromCsv(file)
                .done([ResetFileInput, ShowMonthlyReport, ToggleSpinner]);
        }
        else {
            throw "Error. No files selected.";
        }
    }

    export function ResetFileInput() {
        Utilities.DomManipulationUtility.ClearFileInput("sourceFileInput");
        $("#sourceFileInput").change(ExpenseImport.OnFileInputChange);
        $("#sourceFileInput").trigger("change");
    }

    export function ToggleSpinner() {
        $("#spinner").toggleClass("hide");
    }
    export function ToggleExpenseReport() {
        $("#expenseReportAlert").html("File '" + FileName + "' was successfully imported.");
        $("#expenseReport").toggleClass("hide");
    }

    export function ShowMonthlyReport(reportData) {
        let reportContent = ExpenseImport.Service.ConstructTableContent(reportData);
        $("#expenseReport tbody").html(reportContent);
        ToggleExpenseReport();
    }


    $("#sourceFileInput").change(ExpenseImport.OnFileInputChange);
    $("#importFile").click(ExpenseImport.HandleFileImport);
}
