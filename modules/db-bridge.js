var fs = require('fs')
var _ = require('underscore');
var parse = require('csv-parse');

exports.filesToDb = function(files) {
  _.each(files, function(file) {
    fs.readFile(file.path, 'utf8', function(err, contents) {
      parse(contents, {comment: '#'}, function(err, output){
        _.each(output, function(row) {
          _.each(row, function(elm) {
            console.log(elm);
          })
        });
      });
    });
  });
}
