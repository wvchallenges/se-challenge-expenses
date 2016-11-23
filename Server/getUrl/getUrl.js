/*======================================================================================================
* 
*	uploadExpenses.js 	AWS Lambda handler for expense file upload
*
*   21 Nov 2016 Warren Spencer
*
*   This Lambda hander performs these functions:
*
*		Accept an uploaded 
*   
*======================================================================================================*/

var AWS = require('aws-sdk');
var UUI = require ("node-uuid");

var s3 = new AWS.S3();

exports.handler = function (event, context, callback) {

	var params = {Bucket: 'wavechallengedata', Key: 'env.js', Expires: 60000};
	var url = s3.getSignedUrl('putObject', params);
	//console.log("Put URL is\n" + url);
	var myObj = {
		url: url,
		UUID: UUI.v4()
	}
    callback(null, JSON.stringify (myObj));
}
