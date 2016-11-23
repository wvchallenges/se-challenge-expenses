(function() {
    'use strict';

    var path = require('path'),
        fs = require('fs');

    var joinChunks = function(chunks) {
        var result = '';
        for (var i = 0; i < chunks.length; i++)
            result = path.resolve(result, chunks[i]);
        return result;
    };

    var exists = function(path) {
        try {
            return !!fs.statSync(path, function(err) {
                return err === null;
            });
        } catch (e) {
            return false;
        }
    };

    module.exports = {
        joinChunks: joinChunks,
        exists: exists
    };
}());
