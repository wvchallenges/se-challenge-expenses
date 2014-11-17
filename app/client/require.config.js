/*
  RequireJS config

  RequireJS is configured here, and then the application is launched.
*/

(function() {
  'use strict';

  requirejs.config({
    "baseUrl": "widgets",
    "paths": {
      "almond": "../lib/almond",
      "start": "../start",

      "hbs": "../lib/hbs",
      "jquery": "../lib/jquery-1.11.1.min"
    }
  });

})();
