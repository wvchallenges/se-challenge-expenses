// Require express for routing
var express = require('express');

// Start express
var app = express();

// Save port in port var
var PORT = process.env.PORT || 3000;

// Require bodyParser middleware
var bodyParser = require('body-parser');

// Require mongoose to connect to do
var mongoose = require('mongoose');

// Require lodash lib utilities
var _ = require('lodash');

// Require ejs templating
var ejs = require('ejs');

// Require routes route
var routes = require('./api/routes/routes');

// Require models route
var models = require('./api/models/fileSchema');

// Use es6 implementation of promises
mongoose.Promise = global.Promise;

// Connect to mongo localhost and create db fileUploads
mongoose.connect('mongodb://localhost/fileUploads');
// If it connects log success msg, if error log error
mongoose.connection
	.once('open', () => console.log ('Good to go'))
	.on('error', (error) => {
		console.warn('Warning', error);
	});

// Use html
app.engine('.html',ejs.__express);

// Views are in directory /app
app.set('views', __dirname + '/app'); 
app.set('view engine', 'html');

// Route / renders index.html
app.get('/', function (req,res) {
	res.render('index.html');
});

// All static files on the frontend, express can find in /app
app.use(express.static(__dirname + '/app'));

// Use bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Registering the backend routes
routes(app); 

// Listen on PORT, var defined above
app.listen(PORT, function () {
	console.log('Express server started on port ' + PORT + '!');
});

