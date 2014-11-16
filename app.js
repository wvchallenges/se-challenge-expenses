var express = require('express'),
  orm = require('orm'),
  fs = require('fs'),
  config = require('./config/config');

orm.db = orm.connect(config.db, function(err, db){
  if(err){
    console.log("Something is wrong with the connection", err);
    return ;
  }
});

var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});

var app = express();

require('./config/express')(app, config);
require('./config/routes')(app);

app.listen(config.port);
