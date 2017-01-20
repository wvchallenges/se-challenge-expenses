/**
 * Created by Bharath on 2017-01-12.
 */

'use strict';
var fs = require('fs');

module.exports = function(router){
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == "loader.js") return;
        var name = file.substr(0, file.indexOf('.js'));
        require('./' + name)(router);
    });
};
