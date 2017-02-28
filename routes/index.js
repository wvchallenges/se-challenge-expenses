var express = require('express');
var router = express.Router();
var csvtojson = require('csvtojson');
var _ = require('underscore');
var Record = require('../models/record');

var title = 'SE-challenge-expenses';
router.get('/', function(req, res, next) {
  //Read from Mongo
  Record.find(function (err, rds) {
    if (err) return console.error(err);
	var totalSumPreTax = _.reduce(_.pluck(rds, "pre-tax amount"), function(memo, num) { return memo + num; }, 0);  //Add up all pre-tax
	var totalSumTax = _.reduce(_.pluck(rds, "tax amount"), function(memo, num) { return memo + num; }, 0);	//Add up all tax
	
	res.render('index', { 
		title: title,
		dataList: rds,
		totalExpenseSum: totalSumPreTax + totalSumTax
	});
  })
});

router.post('/', function(req, res, next) {
	if (typeof(req.body.Delete) !== "undefined") {
		//Remove all records
		Record.remove({}, function(err) {
			if (err) {
				res.render('error', { 
					message: "Error deleting reocrds in DB", 
					error: {
						status: "",
						stack: err
					}
				});
			}
			else {
				//Delete Completed!! Redirect back to main.
				res.redirect('/');
			}
		})
	}
	else {
		if (typeof(req.file) === "undefined") {
			res.render('index', { 
				title: title, 
				errors:  [{
					param: 'csvupload',
					msg: 'Please select a file.'
				}]
			});
		}
		else {	
			//Process CSV and push to DB
			return new Promise((resolve, reject) => {
				csvtojson({delimiter: "auto"})	//Convert CSV to JSON object Array
				.fromFile(req.file.path)
				.on('end_parsed',(jsonArrObj)=>{
					resolve(jsonArrObj);
				})
			})
			.then((jsonArrObj) => {	
				//Write to Mongo; need to convert amount from string to number to match data type.
				Record.insertMany(_.map(jsonArrObj, function(r) {
					r["pre-tax amount"] = Number(r["pre-tax amount"].replace(/[^0-9\.]+/g,"")).toFixed(2);  //Remove all non dots (e.g. $ or ,)
					r["tax amount"] = Number(r["tax amount"].replace(/[^0-9\.]+/g,"")).toFixed(2); 
					return r;
				}), function(err) {
					if (err) {
						res.render('error', { 
							message: "Error inserting into DB", 
							error: {
								status: "",
								stack: err
							}
						});
					}
					else {
						//Add Completed!! Redirect back to main to show all DB records.
						res.redirect('/');
					}
				})
			});		
		}
	}
});

module.exports = router;
