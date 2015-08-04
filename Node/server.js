console.log('Server started...');

var http = require('http');
var express = require('express');
var cors = require('cors')
var challenge = require('./challenge');

var app = express();
app.use(cors());

challenge.init(app);

app.get('/', function(req, res) {
    res.send('api is running');
}); 

var server = http.createServer(app);
server.listen(3000);