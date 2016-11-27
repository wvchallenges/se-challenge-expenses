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

	// Return this object to the caller
	var clientResponse = {
		  StatusCode: '0'
		, StatusMessage: "Successful"
		, Totals: [
			{ "2015-12" : 120.12 }
		  ,	{ "2016-01" : 240.24 }
		  , { "2016-02" : 360.36 }
		]
	}

	// We're done. Call the Lambda exit  handler - it will stringify clientResponse and return it to the caller
    callback(null, clientResponse);
}
