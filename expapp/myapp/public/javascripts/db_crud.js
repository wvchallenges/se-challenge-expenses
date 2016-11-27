function db_insert_expense_file(arr, chksum, callback)
{
   var fs = require("fs");
   var file = "accounting.db";

   var sqlite3 = require("sqlite3");
   var db = new sqlite3.Database(file);

   db.serialize(function() {
      db.all ("SELECT EXISTS(SELECT 1 FROM file_checksums WHERE checksum='" + chksum + "') AS file_exists", function(err, rows) {
         rows.forEach(function(row){
            if(row.file_exists)
            {
               select_expenses_total(db, callback, "File previously imported, values ignored.");
            }
            else
            {
               var stmt = db.prepare("INSERT INTO file_checksums VALUES (?)");
               stmt.run(chksum);
               stmt.finalize();

               insert_expenses(db, arr, callback, "New file, values added to total.");
            } 
         });
      });
   });
}

function insert_expenses(db, arr, callback, file_notification){
   db.serialize(function() {
      var stmt = db.prepare("INSERT INTO expenses VALUES (NULL,?,?,?,?,?,?,?,?)");

      for(var i = 1; i < arr.length; i++)
      {
         var line = arr[i];
stmt.run(convert_date(line[0]),line[1],line[2],line[3],line[4],(line[5].trim()).replace(/[^\d\.\-\ ]/g, ''),line[6],(line[7]).replace(/[^\d\.\-\ ]/g, ''));
      }

      stmt.finalize();

      select_expenses_total(db, callback, file_notification);
   });
}

function select_expenses_total(db, callback, file_notification){
   var summary = [];

   db.all("SELECT SUM(exp_pre_tax_amt + exp_tax_amt) AS total_amount, strftime('%Y-%m', exp_date) as month FROM expenses GROUP BY strftime('%Y-%m', exp_date)", function(err, rows) {
      rows.forEach(function (row) {
         var rowToPush = {month:row.month,amount:(row.total_amount).toFixed(2)};
         summary.push(rowToPush);
      });

      callback(summary, file_notification);
   });
}

// Convert date into SQLite-friendly format
function convert_date(naDate) {
  var dateParts = naDate.split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  return dateParts[3] + "-" + ("0" + dateParts[1]).slice(-2) + "-" + ("0" + dateParts[2]).slice(-2);
}

module.exports.db_insert_expense_file = db_insert_expense_file;
