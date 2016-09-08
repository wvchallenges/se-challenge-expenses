namespace Utilities.FileUtility {
    export let ReadFileAsText = (file) => {
        let promise = $.Deferred();

        // Using HTML5 FileReader (File API)
        let fr = new FileReader();

        // Specify callback for read completion
        fr.onload = function (e: any) {
            // Obtain the read file data 
            let text = e.target.result;
            promise.resolve(text);
        };
        fr.readAsText(file);

        return promise;
    }

    export let ParseCsvFileIntoJson = (file) => {
        let promise = $.Deferred();

        ReadFileAsText(file).then(function (text: string) {
            // Convert text to JSON and return

            let jsonFileRecords = [];
            let record = {};
            let propertyNames: string[] = [];
            let propertyName: string;

            // DEBUG
            let output = [];

            let lines;
            let lineValues;
            let value;

            lines = text.split(/[\r\n]+/g); // tolerate both Windows and Unix linebreaks
            propertyNames = lines[0].split(",");

            for (let i = 0; i < propertyNames.length; i++) { 
                propertyName = propertyNames[i];
                propertyNames[i] = ToPascalCase(propertyName);
            }

            // Proccess record values
            for (let i = 1; i < lines.length; i++) {

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

    ///
    /// Parsing is based on https://en.wikipedia.org/wiki/Comma-separated_values as of Sep 7 2016 at ~ 12:50pm
    ///
    export let ParseCsvLineIntoObject = (line: string, lineNumber: number, objectProperties: string[]) => {
        let lineObject = {};
        let propertyValues = [];
        let currentCharacter;
        let nextCharacter;
        let currentValue;
        let isBuildingValue = false;
        let isFieldQuoted = false;

        if (line) {
            // populate array of values
            // First n-1 characters
            for (let i = 0; i < line.length - 1; i++) {
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
                            // otherwise proceed to default case and continue building quoted field                        
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
            let propertyValue;
            let propertyName;
            for (let i = 0; i < propertyValues.length; i++) {
                propertyValue = propertyValues[i];

                // Remove quotes from string values and add value to record object
                propertyValue = propertyValue.replace('"', '');
                // Trim from spaces before and after
                propertyValue = propertyValue.trim();

                // Initialize and add property to the record object
                propertyName = objectProperties[i];
                lineObject[propertyName] = propertyValue;
            };

        }

        return lineObject;
    }

    export let ToPascalCase = (str:string) => {
        return str.replace('-', ' ')
            .replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })
            .replace(' ', '')
            .replace(' ', '');
    }
}