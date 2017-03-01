var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var RecordSchema = new Schema({
  date: Date,
  category : String,
  "employee name" : String,
  "employee address" : String,
  "expense description": String,
  "pre-tax amount": Number,
  "tax name": String,
  "tax amount": Number
});

module.exports = mongoose.model('Record', RecordSchema);