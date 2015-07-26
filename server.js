// server.js

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));
app.use("/js", express.static(__dirname + '/public/js'));

// Routes module
require('./app/routes')(app); // configure our routes

app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080, process.env.OPENSHIFT_NODEJS_IP, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), process.env.OPENSHIFT_NODEJS_IP || 'localhost', process.env.OPENSHIFT_NODEJS_PORT || 8080);
        });
