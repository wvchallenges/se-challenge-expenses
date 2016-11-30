/*======================================================================================================
* 
*	getResults.js 	AWS Lambda handler: Accepts a UUID, returns summary results
*
*   22 Nov 2016 Warren Spencer
*
*	Inputs:  	UUID of the file to process
*
*	Returns: 	Stringify'd JSon object {
*					StatusCode: string ("0" on success.  Anything else is an error)
*					StatusMessage: string
*					Totals: [
*						{ month_id: month_total}
*					  ,	{ month_id: month_total}
*					  ,	{ month_id: month_total}
*					  ...
*					]
*				}
*	
*	Revision History
*	~~~~~~~~~~~~~~~~
*
*	23 Nov 2016  W. Spencer  Created.
*   
*======================================================================================================*/

const AWS = require("aws-sdk");

var s3 = new AWS.S3();

// Lambda entry point
exports.handler = function (event, context, callback) {

	console.log ("6B281210 getResults for event:", event);

	// Read the file from S3 storage
	var params = {
		  Bucket: "wavechallengedata"
		, Key: event.filename
	}

	s3.getObject (params, function (err, data) {

		if (err) {
			// File not found, or some other error
			if (err.errorType == "NoSuchKey")
			{
				err.StatusCode = "6B221128";
				err.StatusMessage = "Unexpected error from s3.getObject()";
				callback (new StatusMsg ("6B221128", "File not found"), null);
			} else {
				err.StatusCode = "6B221129";
				err.StatusMessage = "Unexpected error from s3.getObject()";
				callback (err, null);
			}

		} else {

			// We successfully read the file
			ProcessFileContent (event.filename, data.Body.toString("utf8"), callback);
		}
	});
}

// This function processes the contents of the submitted file and returns
// the result payload to the caller
function ProcessFileContent (filename, content, callback) {

	var dbDoc = {} // We'll write this object to the database once it's populated
	var MonthlyTotals = {}; // We'll accumulate the monthly totals in this map

	// Setup DynamoDB database access
    AWS.config.update({ region: "us-west-2" });
	var DB = new AWS.DynamoDB.DocumentClient(); // For DynamoDB access

	// Create the result object we'll later return to the caller
	var result = new StatusMsg ("0", "Success");

	// From the sample file:
	// date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount
	// 12/1/2013,Travel,Don Draper,"783 Park Ave, New York, NY 10021",Taxi ride, 350.00 ,NY Sales tax, 31.06 

	var columnNames = { // Map of Column Names to Column Numbers for our input data
		0: "date"
	  , 1: "category"
	  , 2: "employee name"
	  , 3: "employee address"
	  , 4: "expense description"
	  , 5: "pre-tax amount"
	  , 6: "tax name"
	  , 7: "tax amount"
	} ;

	// Split the file into an array of lines
	var allLines = content.split(/\r\n|\n/);

	// We'll save this document to the database
	dbDoc = {
		Filename: filename,
		Data: allLines
	}

	// Loops through the lines and process each one.  Skip the first line - it's column names.
	for (var i=1; i < allLines.length; i++){

		// Split into an array of fields. Split at commas, excepting quoted commas.
		var fields = allLines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
		processRecord (i + 1);
	}

	// Remove rounding errors from MonthlyTotals, and create the 'summary' array that we'll return to the caller.
	var summary = [];

	for (var key in MonthlyTotals) {
		MonthlyTotals [key] = (Math.round (MonthlyTotals [key] * 100)) / 100;
		var obj = {};
		obj [key] = MonthlyTotals [key];
		summary.push (obj);
	}

	summary = summary.sort (summaryCompare);

	result.Totals = summary; // Make it part of our return object

	// Write the document to DynamoDB
    var params = {
        "TableName": "Prod_WaveChallenge",
        "Item": dbDoc
    };

    DB.put(params, function (err, data) {

    	if (err) {
    		err.StatusCode = "6B281313";
    		err.StatusText = "Unexpected database error: " + JSON.stringify (err);
    		callback (err, null);

    	} else {

			if (result.StatusCode == "0")
				callback (null, result);
			else
				callback (result, null);
    	}
    });

 	return (result);

 	// Local Helper Functions below this line
 	//--------------------------------------------------------------------------------------------
 	function summaryCompare (a, b) {

 		if (Object.keys(a)[0] > Object.keys(b)[0]) {
 			return 1;
 		} 

 		if (Object.keys(a)[0] < Object.keys(b)[0]) {
 			return -1;
 		}

 		return 0;
 	}

	function processRecord (lineNumber) {

		var dbRecord = {}; // A map to represent a single row from the input file

		for (var i=0; i < fields.length; i++) {

			var field = fields[i]; // Grab a single field

			// Remove leading/trailing quotes if present
			if (field[0] == '"' && field[field.length - 1] == '"'
			 || field[0] == "'" && field[field.length - 1] == "'") {

				field = field.substr (1, field.length - 2);
			}

			// Remove leading/trailing spaces
			field = field.trim();

			dbRecord [columnNames [i]] = field; // Add a key and value. e.g. date: "2/3/2011"
		}

		// Remove embedded commas from pre-tax amount and tax amount
		dbRecord[columnNames[5]] = dbRecord[columnNames[5]].replace(/,/g , "");
		dbRecord[columnNames[7]] = dbRecord[columnNames[7]].replace(/,/g , "");

		// Accumulate summary totals by month
		accumulateTotals ();

		return; //-----------------

		function accumulateTotals () {

			// Total = pre tax amount (5) + tax amount (7). This should be wrapped in exception handling.
			var totalAmount = parseFloat (dbRecord[columnNames[5]]) + parseFloat (dbRecord[columnNames[7]]);

			// Convert the date field to the form YYYY-MM.  Eg 12/25/2001 -> 2001-12. We'll use this
			// as the key in a map to accumulate monthly totals, which we eventually return to the caller.
			var dt = new Date (dbRecord ["date"]);
			var key = dt.toJSON().substr (0, 7);

			if (MonthlyTotals[key]) {
				MonthlyTotals[key] = parseFloat(MonthlyTotals[key]) + totalAmount;
			} else {
				MonthlyTotals[key] = totalAmount;
			}
		}

	}
}

// Constructor
var StatusMsg = function (code, message) {
	return {
		StatusCode: code,
		StatusMessage: message
	}
}
