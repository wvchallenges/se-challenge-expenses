/*======================================================================================================
* 
*	getUrl.js 	AWS Lambda handler: Accepts nothing, returns an upload Url
*
*   21 Nov 2016 Warren Spencer
*
*	Inputs  	None
*	Returns 	Stringify'd JSon object {
*					Url: string
*					Uuid: string
*				}
*	
*	Revision History
*	~~~~~~~~~~~~~~~~
*
*	23 Nov 2016  W. Spencer  Created.
*   
*======================================================================================================*/

const AWS = require("aws-sdk");
const UUI = require ("node-uuid");
const URL = require ("url");
const QRY = require("querystring");

var s3 = new AWS.S3();

// Lambda entry point
exports.handler = function (event, context, callback) {

	// This UUID will uniquely identify the file within the S3 bucket.  It is
	// essentially the filename.
	var filename = UUI.v4();

	// We'll hard code Bucket name and Expires even though they should be pulled form
	// an environment-specific central config.  This object identifies the S3
	// bucket (similar to a directory) I've set up to host the uploaded files.
	var params = {Bucket: 'wavechallengedata', Key: filename, Expires: 600}; // 600 seconds expiry time

	// This url will give the caller a time-limited opportunity to upload a file
	var s3Url = s3.getSignedUrl('putObject', params);

	// Parse into an object so we can reference different parts of the url easily
	var urlObj = URL.parse(s3Url);

	// Parse the "query" part of the url into individual object properties
	var params = QRY.parse (urlObj.search.substr(1)); // First character in this string is always "?"); 

	// Return this object to the caller
	var clientResponse = {
		  Url: urlObj.protocol + "//" + urlObj.host + urlObj.pathname // https://wavechallengedata.s3.amazonaws.com/filename
		, AWSAccessKeyId: params.AWSAccessKeyId // AKIAJAFRE63KT2JMTL6Q
		, Expires: params.Expires // 1480086036
		, Signature: params.Signature // AbUCQdJVm0zNZiHlqnjtfaGDBcw=
		, Uuid: filename // ee226a23-4520-4b35-9d92-176c003bb0cb
	}

	// We're done. Call the Lambda exit  handler - it will stringify clientResponse and return it to the caller
    callback(null, clientResponse);
}
