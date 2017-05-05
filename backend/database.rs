// rust import

use std::sync::{Arc, Mutex};

// 3rd-party imports

use rusqlite::Connection;

// database

macro_rules! db_write_lock(
    ($ident:ident; $e:expr) => (

        {
            use database::{Database};

            // hacky type checking
            let _: Database = $e;
        };

        let __db_write_lock = $e;
        let __db_conn_guard = __db_write_lock.lock().unwrap();
        let ref $ident = *__db_conn_guard;
    )
);

const TABLE: &'static str = "
CREATE TABLE IF NOT EXISTS ExpenseHistory (
    date TEXT,
    category TEXT,
    employee_name TEXT,
    employee_address TEXT,
    expense_description TEXT,
    pre_tax_amount REAL,
    tax_name TEXT,
    tax_amount REAL
);
";

pub type Database = Arc<Mutex<Connection>>;

pub fn get_database(file_path: String) -> Database {

    let db_connection = match Connection::open(file_path.as_str()) {
        Err(why) => {
            // TODO: fix
            panic!("{}", why);
        }
        Ok(db_conn) => Arc::new(Mutex::new(db_conn)),
    };

    {
        db_write_lock!(db_conn; db_connection.clone());
        let db_conn: &Connection = db_conn;

        match db_conn.execute_batch(TABLE) {
            Err(sqlite_error) => {
                panic!("{:?}", sqlite_error);
            }
            _ => {
                /* query sucessfully executed */
            }
        }
    };

    db_connection
}
