$().ready(function () {

    function handleFileImport() {
        // TODO: extract code specific to Expense Import to its own module
        var selectedCsv = (<HTMLInputElement>$("#sourceFileInput")[0]).files[0];

        if (selectedCsv) {
            var output = [];
            var fr = new FileReader();
            fr.onload = function (e: any) {
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
            // TODO: handle
        }
    }
});