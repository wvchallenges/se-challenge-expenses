namespace ExpenseImport {

    export function OnFileInputChange() {
        if (this.files.length > 0) {
            let fileName = this.files[0].name;
            let message = "'" + fileName + "' is ready to be imported";
            $("#fileName").html(message).removeClass("hide");;
            $("#inputFileButton").removeClass("btn-primary").addClass("btn-default");
            $("#importFile").removeClass("hide");
        }
        else {
            $("#fileName").html("file path").addClass("hide");
            $("#inputFileButton").removeClass("btn-default").addClass("btn-primary");
            $("#importFile").addClass("hide");

        }
    }

    export function HandleFileImport() {
        let files = (<HTMLInputElement>$("#sourceFileInput")[0]).files;

        if (files.length > 0) {
            Service.ImportExpenseFileFromCsv(files[0]);
        }
        else {
            throw "Error. No files selected.";
        }
    }

    

    $("#sourceFileInput").change(ExpenseImport.OnFileInputChange);
    $("#importFile").click(ExpenseImport.HandleFileImport);
}
