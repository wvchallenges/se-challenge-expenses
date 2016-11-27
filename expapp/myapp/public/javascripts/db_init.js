function db_initialize(){
   var sqlite3 = require('sqlite3');
   var db = new sqlite3.Database('accounting.db');

   db.serialize(function() {
      db.run("CREATE TABLE IF NOT EXISTS expenses (exp_id INTEGER PRIMARY KEY,exp_date TEXT,exp_cat TEXT,exp_employee_name TEXT,exp_employee_address TEXT,exp_desc TEXT,exp_pre_tax_amt REAL,exp_tax_ent TEXT,exp_tax_amt REAL)");
      db.run("CREATE TABLE IF NOT EXISTS file_checksums (checksum TEXT)");
   });

   db.close();
}

module.exports.db_initialize = db_initialize;
