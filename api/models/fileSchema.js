// Create fileSchema model

// Require mongoose to connect to db
var mongoose = require('mongoose');

// Create schama instance, save variable
var schema = mongoose.Schema;

// Create new schema called FileSchema with the fields below
var FileSchema = new schema({
	date: {
		type: Date,
		required: 'Date not Found'
	},
	category: {
		type: String,
		required: 'Category not Found'
	},
	employeeName: {
		type: String,
		required: 'Employee name not Found'
	},
	employeeAddress: {
		type: String,
		required: 'Employee address not Found'
	},
	expenseDescription: {
		type: String,
		required: 'Expense description not Found'
	},
	preTaxAmount: {
		type: String,								// Needs to be number, string.replace
		required: 'Pre-tax amount not Found'
	},
	taxName: {
		type: String,
		required: 'Tax name not Found'
	},
	taxAmount: {
		type: String,								// Needs to be number, string.replace
		required: 'Tax Amout not Found'
	}
})

// Export the model to be used in app
module.exports = mongoose.model('File', FileSchema);