// Backend Controller

// Require mongoose to connect to mongo
var mongoose = require('mongoose');

// Require the FileSchema model
var FileSchema = mongoose.model('File');

// Require lodash utilities
var _ = require('lodash');

// Require tool to convert csv to json
var Converter = require("csvtojson").Converter;

// Create a function called createFiles to export the created files
exports.createFiles = function (req, res) {

	// new converter instance
	var converter = new Converter({});
	converter.fromString(req.body.data, function(err,result){
		console.log('result', result);
		
		// Store the length of the files to loop through
		var fileLength = result.length;

		// Loop through files
		for(var i =0; i< result.length; i ++){

			(function(data){
				// After each loop the number of files decreases by one
				--fileLength;

				// Create an object for the files being saved with the required fields
				var filesToSave = {
					date: data['date'],
					category: data['category'],
					employeeName: data['employee name'],
					employeeAddress: data['employee address'],
					expenseDescription: data['expense description'],
					preTaxAmount: data['pre-tax amount'],
					taxName: data['tax name'],
					taxAmount: data['tax amount']		
				}

				// Save each file using the FileSchema
				var new_file = new FileSchema(filesToSave);
				new_file.save(function(err, savedFile){
					// if it errors, return the error
					if(err) {
						console.log('error', err);
						// return res.json({message: 'This error was returned : ' + err})
					}
					// Continue until the number of files are 0, which means that all of the files have been saved
						// if(fileLength  === 0){
						// 	res.json({mesaage: 'Files successfully saved'});
						// }
				});
			})(result[i]);
			if(fileLength  === 0){
			 	res.json({message: 'Files successfully saved'});
			}
		}
	});
	

}

// Create a function to Query the db to get all the files
exports.getAllFiles = function (req, res) {

	// find allFiles from the FileSchema
	FileSchema.find().exec(function(err, allFiles){

		// if it works return allFiles
		if(!err) {
			return res.json(allFiles);
		} else {
			// if it fails, return the error
			console.log('error', err);
			return res.json({message: 'This error was returned : ' + err})
		}
	});
}


// Query the db to get a single file
exports.getSingleFile = function (req, res) {
	// save the id as a unique id
	var id = req.params.fileId;
	FileSchema.findById(id).exec(function(err, file) {
		// if function works return the file // if it fails, return the error
		if(!err) {
			return res.json(file);
		} else {
			console.log('error', err);
			return res.json({message: 'This error was returned : ' + err})
		}
	});
}

// Function to delete a file
exports.deleteSingleFile = function (req, res) {
	// save the id as a unique id
	var id = req.params.fileId;
	// remove file id from FileSchema
	FileSchema.remove({
		_id: id
	}).exec(function(err, file) {
		if(!err) {
			return res.json(file);
		} else {
			console.log('error', err);
			return res.json({message: 'This error was returned : ' + err})
		}
	});
}