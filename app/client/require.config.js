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
      "start": "../start"

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
