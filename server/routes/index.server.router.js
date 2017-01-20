'use strict';
var index = require('../controllers/index.server.controller');
module.exports = function(router) {
  /* GET home page. */
    router.get('/', index.init);
};