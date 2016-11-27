// app/index.js
var init = require('./db_init');
init.db_initialize();

var import_it = require('./csv_import');
import_it.import_csv_data();
