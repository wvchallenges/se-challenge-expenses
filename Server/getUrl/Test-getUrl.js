/*======================================================================================================
* 
*	Test-getUrl.js 		Tests getUrl.js locally
*
*   20 Nov 2016 W. Spencer
*
*======================================================================================================*/


console.log('Test-getUrl.js started');

const LOCK = require("./getUrl.js");

// Lambda provides an event object and a context object when calling 'lock'. So
// we'll build a 'fake' ones here. getUrl doesn't use anything from them, so they 
// can be empty.
event = {};
context = {};

// getUrl completion handler
function completionHandler(err, returnVal) {
	if (err) {
		console.log ("Error:", err);
	    process.exit(1);
	} else {
	    console.log("Success: ", returnVal);
	    process.exit(0);
	}
}

// Invoke the function just like the Lambda runtime would
LOCK.handler(event, context, completionHandler);
