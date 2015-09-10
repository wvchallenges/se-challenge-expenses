(function() {
    'use strict';

    var path = require('path');

    var joinChunks = function(chunks) {
        var result = '';
        for (var i = 0; i < chunks.length; i++)
            result = path.resolve(result, chunks[i]);
        return result;
    };

    module.exports = {
        joinChunks: joinChunks
    };
}());
