var express = require('express'),
    exphbs  = require('express-handlebars');

module.exports = function(app, config) {
  app.configure(function () {
    app.use(express.compress());
    app.use(express.static(config.root + '/public'));
    app.set('port', config.port);
    app.set('views', config.root + '/app/views');
    app.engine('handlebars', exphbs({defaultLayout: 'main', layoutsDir: config.root + '/app/views/layouts'}));
    app.set('view engine', 'handlebars');
    app.use(express.favicon(config.root + '/public/img/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(function(req, res) {
      res.status(404).render('404');
    });
  });
};
