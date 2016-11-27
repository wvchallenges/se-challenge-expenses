function import_csv_data(arg, callback){
   var fs = require('fs'); 
   var parse = require('csv-parse');
   var db_crud = require('./db_crud');
   var crypto = require('crypto');

   var csvData=[];
   var hash = crypto.createHash('md5');
   fs.createReadStream(arg)
      .pipe(parse({delimiter: ',',trim: true}))
      .on('data', function(csvrow) {
          csvData.push(csvrow);
          hash.update(csvrow.toString(), 'utf8');
      })
      .on('end',function() {
          var chksm = hash.digest('hex');
          db_crud.db_insert_expense_file(csvData, chksm, callback);
      });
}

module.exports.import_csv_data = import_csv_data;
