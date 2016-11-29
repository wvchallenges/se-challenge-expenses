/*======================================================================================================
* 
*	getResults.js 	AWS Lambda handler: Accepts a UUID, returns summary results
*
*   22 Nov 2016 Warren Spencer
*
*	Inputs:  	UUID of the file to process
*
*	Returns: 	Stringify'd JSon object {
*					StatusCode: string
*					StatusMessage: string
*					Totals: [
*						MonthId: string
*						MonthTotal: number
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
/*const UUI = require ("node-uuid");
const URL = require ("url");
const QRY = require("querystring");
*/
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
			result = ProcessFileContent (data.Body.toString("utf8"));

			if (result.StatusCode == "0")
				callback (null, result);
			else
				callback (result, null);
		}
	});
}

var StatusMsg = function (code, message) {
	return {
		StatusCode: code,
		StatusMessage: message
	}
}

function ProcessFileContent (content) {

	// Create the result object we'll later return to the caller
	var result = new StatusMsg ("0", "Success");

	console.log (content);
// date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount
// 12/1/2013,Travel,Don Draper,"783 Park Ave, New York, NY 10021",Taxi ride, 350.00 ,NY Sales tax, 31.06 

	var columns = { // Map of Column Names to Column Numbers for our input data
		"date": 0
	  , "category": 1
	  , "employee": 2
	  , "name": 3
	  , "employee": 4
	  , "address": 5
	  , "expense": 6
	  , "description": 7
	  , "pre-tax amount" 8
	  , "tax name": 9
	  , "tax amount": 10
	} ;


 	result.Totals = totals;
 	return (result);
}

/*
	        // Extract Column Names from row 0
	        var colNames = [];
	        for (var i = 0; i < myBooks.length; i++) {
	            for (var key in myBooks[i]) {
	                if (colNames.indexOf(key) === -1) {
	                    colNames.push(key);
	                }
	            }
	        }
	var totals = [
 		{ "2015-12" : 120.12 }
 	  ,	{ "2016-01" : 240.24 }
 	  , { "2016-02" : 360.36 }
 	  ,	{ "2016-01" : 240.24 }
 	  , { "2016-02" : 360.36 }
 	];

	var clientResponse = {
 +		  StatusCode: '0'
 +		, StatusMessage: "Successful"
 +		, Totals: [
 +			{ "2015-12" : 120.12 }
 +		  ,	{ "2016-01" : 240.24 }
 +		  , { "2016-02" : 360.36 }
 +		]
 +	}

*/
