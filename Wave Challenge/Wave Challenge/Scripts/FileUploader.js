// TODO: extract code specific to Expense Import to its own module
// Add label showing path to file
var FileUploader;
(function (FileUploader) {
    function onFileInputChange() {
        if (this.files.length > 0) {
            var fileName = this.files[0].name;
            var message = "'" + fileName + "' is ready to be imported";
            $("#fileName").html(message).removeClass("hide");
            ;
            $("#inputFileButton").removeClass("btn-primary").addClass("btn-default");
            $("#importFile").removeClass("hide");
        }
        else {
            $("#fileName").html("file path").addClass("hide");
            $("#inputFileButton").removeClass("btn-default").addClass("btn-primary");
            $("#importFile").addClass("hide");
        }
    }
    FileUploader.onFileInputChange = onFileInputChange;
    function handleFileImport() {
        var selectedCsv = $("#sourceFileInput")[0].files[0];
        if (selectedCsv) {
            var output = [];
            var fr = new FileReader();
            fr.onload = function (e) {
                // e.target.result should contain the text
                var text = e.target.result;
                var lines = text.split(/[\r\n]+/g); // tolerate both Windows and Unix linebreaks
                for (var i = 0; i < lines.length; i++) {
                    output.push('<li>' + lines[i] + '<br>');
                }
                document.getElementById('file').innerHTML = 'File contents:<ul>' + output.join('') + '</ul>';
            };
            fr.readAsText(selectedCsv);
        }
        else {
        }
    }
    FileUploader.handleFileImport = handleFileImport;
})(FileUploader || (FileUploader = {}));
$("#sourceFileInput").change(FileUploader.onFileInputChange);
$("#importFile").click(FileUploader.handleFileImport);
//# sourceMappingURL=FileUploader.js.map