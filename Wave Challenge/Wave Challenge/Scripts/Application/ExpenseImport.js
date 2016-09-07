// TODO: extract code specific to Expense Import to its own module
// Add label showing path to file
var ExpenseImport;
(function (ExpenseImport) {
    function OnFileInputChange() {
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
    ExpenseImport.OnFileInputChange = OnFileInputChange;
    function HandleFileImport() {
        var files = $("#sourceFileInput")[0].files;
        if (files.length > 0) {
            ImportExpenseRecords(files[0]);
        }
        else {
            throw "Error. No files selected.";
        }
    }
    ExpenseImport.HandleFileImport = HandleFileImport;
    function ImportExpenseRecords(file) {
        // Parse file into JSON
        var jsonImport = ParseFileIntoJson(file).then(function (jsonFile) {
            var b = 5;
            //throw "testing errors";
        });
        // Send JSON to server for processing
        // Act on result
    }
    function ParseFileIntoJson(file) {
        var promise = $.Deferred();
        ReadFileAsText(file).then(function (text) {
            // Convert text to JSON and return
            var jsonFileRecords = [];
            var record = {};
            var propertyNames = [];
            var propertyName;
            // DEBUG
            var output = [];
            var lines;
            var lineValues;
            var value;
            lines = text.split(/[\r\n]+/g); // tolerate both Windows and Unix linebreaks
            propertyNames = lines[0].split(",");
            // Proccess record values
            for (var i = 1; i < lines.length; i++) {
                // Parse line into an object
                record = ParseCsvLineIntoObject(lines[i], i + 1, propertyNames);
                // pushobject to jsonFileRecords
                jsonFileRecords.push(record);
                // DEBUG
                output.push('<li>' + lines[i] + '<br>');
            }
            // DEBUG
            document.getElementById('file').innerHTML = 'File contents:<ul>' + output.join('') + '</ul>';
            promise.resolve(jsonFileRecords);
        });
        return promise;
    }
    /// Parsing is based on https://en.wikipedia.org/wiki/Comma-separated_values as of Sep 7 2016 at ~ 12:50pm
    //
    function ParseCsvLineIntoObject(line, lineNumber, objectProperties) {
        var lineObject = {};
        var propertyValues = [];
        var currentCharacter;
        var nextCharacter;
        var currentValue;
        var isBuildingValue = false;
        var isFieldQuoted = false;
        if (line) {
            // populate array of values
            // First n-1 characters
            for (var i = 0; i < line.length - 1; i++) {
                currentCharacter = line.charAt(i);
                nextCharacter = line.charAt(i + 1);
                if (isBuildingValue) {
                    switch (currentCharacter) {
                        case '"': {
                            if (isFieldQuoted) {
                                switch (nextCharacter) {
                                    case '"': {
                                        if (i === line.length) {
                                            throw 'Error processing file. Last field on line #' + lineNumber + ' is quoted but does not end with double-quote,'
                                                + ' it ends with a pair of double quotes which is not allowed, since it is a mechanism of escaping double-quote inside quoted field';
                                        }
                                        else {
                                            //  A pair of double-quote characters that escapes an embeded double-quote
                                            currentValue += '"';
                                            // skip next character since it is a part of a double-quote pair
                                            i++;
                                            // Exit nextCharacter switch
                                            break;
                                        }
                                    }
                                    case ',': {
                                        // This indicates an end of a quoted field
                                        propertyValues.push(currentValue);
                                        isBuildingValue = false;
                                        // skip next character since it is a separator
                                        i++;
                                        break;
                                    }
                                }
                                // Exit currentCharacter switch
                                break;
                            }
                            else if (nextCharacter === ',') {
                                // The end of a non-quoted field
                                propertyValues.push(currentValue);
                                isBuildingValue = false;
                                break;
                            }
                            else {
                                // TODO: review
                                console.log('Error processing file. Double quote character on line #' + lineNumber + ' is not followed by either " or ,');
                            }
                        }
                        case ',': {
                            if (!isFieldQuoted) {
                                // Finish building an unquoted field
                                propertyValues.push(currentValue);
                                isBuildingValue = false;
                                break;
                            }
                        }
                        // default: add current character to the field value
                        default: {
                            currentValue += currentCharacter;
                            break;
                        }
                    }
                }
                else {
                    // Reset
                    isFieldQuoted = false;
                    currentValue = "";
                    isBuildingValue = true;
                    if (currentCharacter === '"') {
                        // Start quoted field
                        isFieldQuoted = true;
                    }
                    else {
                        // Start non-quoted field
                        currentValue += currentCharacter;
                    }
                }
            }
            // Last character 
            switch (line.charAt(line.length)) {
                case '"': {
                    if (isFieldQuoted) {
                        // Finish building last field
                        propertyValues.push(currentValue);
                        break;
                    }
                }
                case ',': {
                    currentValue += currentCharacter;
                    propertyValues.push(currentValue);
                    propertyValues.push('');
                }
                default: {
                    currentValue += currentCharacter;
                    propertyValues.push(currentValue);
                    break;
                }
            }
            // populate lineObject
            var propertyValue;
            var propertyName;
            for (var i = 0; i < propertyValues.length; i++) {
                propertyValue = propertyValues[i];
                // Remove quotes from string values and add value to record object
                propertyValue = propertyValue.replace('"', '');
                // Trim from spaces before and after
                propertyValue = propertyValue.trim();
                // Initialize and add property to the record object
                propertyName = objectProperties[i];
                lineObject[propertyName] = propertyValue;
            }
            ;
        }
        return lineObject;
    }
    function ReadFileAsText(file) {
        var promise = $.Deferred();
        // Using HTML5 FileReader (File API)
        var fr = new FileReader();
        // Specify callback for read completion
        fr.onload = function (e) {
            // Obtain the read file data 
            var text = e.target.result;
            promise.resolve(text);
        };
        fr.readAsText(file);
        return promise;
    }
    function ImportExpenseRecords() {
    }
})(ExpenseImport || (ExpenseImport = {}));
$("#sourceFileInput").change(ExpenseImport.OnFileInputChange);
$("#importFile").click(ExpenseImport.HandleFileImport);
