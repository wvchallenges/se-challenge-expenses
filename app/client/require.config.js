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

      "jquery": "../lib/jquery-1.11.1.min"

      // "lib": lib,
      // "jquery": lib + "/jquery",
      // "Ractive": lib + "/Ractive",

      // "text": plugins + "/text",
      // "rv": plugins + "/rv",

      // "Model": core + "/Model"
    }
  });


  /*
    Launch the application
  */

  // requirejs(['start']);

})();
