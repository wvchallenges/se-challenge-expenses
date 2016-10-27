// libraries
var express = require('express');
var session = require('express-session');
var fs      = require('fs');

// routes
var r_expenses = require('./routes/expenses');
var routes = [r_expenses];

// constants
var SERVER_CONSTANTS = require('./config/server');

// app
var Wave = function() {

    var self = this;

    self.setupVariables = function() {
        self.ipaddress = SERVER_CONSTANTS.IPADDRESS;
        self.port      = SERVER_CONSTANTS.PORT;
        self.secret    = SERVER_CONSTANTS.SECRET;
    };

    self.terminator = function(sig) {
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating app ...', Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };

    self.setupTerminationHandlers = function(){
        process.on('exit', function() { self.terminator(); });

        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };

    self.createRoutes = function() {
      self.app = express();
      self.app.use(session({secret: self.secret}));

      self.app.use('/', express.static(__dirname + '/static/html'));
      self.app.use('/css', express.static(__dirname + '/static/css'));
      self.app.use('/img', express.static(__dirname + '/static/img'));
      self.app.use('/js',  express.static(__dirname + '/static/js' ));

      for (var r in routes) {
        if (routes[r].hasOwnProperty('get')) {
          for (var g in routes[r].get) {
            self.app.get(g, routes[r].get[g]);
          }
        }
        if (routes[r].hasOwnProperty('post')) {
          for (var p in routes[r].post) {
            self.app.post(p, routes[r].post[p]);
          }
        }
      }
    }

    self.initialize = function() {
      self.setupVariables();
      self.setupTerminationHandlers();
      self.createRoutes();
      self.start();
    }

    self.start = function() {
      self.app.listen(self.port, self.ipaddress, function() {
        console.log('%s: Node server started on %s:%d ...', Date(Date.now()), self.ipaddress, self.port); });
    }
}

var WaveApp = new Wave();
WaveApp.initialize();
