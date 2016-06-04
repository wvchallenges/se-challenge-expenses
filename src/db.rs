
use postgres::Connection;
use postgres::SslMode;

use std::env;

pub fn connect() -> Connection {
    let connect_str = env::var("POSTGRES_URI").unwrap_or("postgresql://postgres@localhost".to_string());
    Connection::connect(connect_str.as_str(), SslMode::None).unwrap()
}

pub fn bootstrap() {
    let conn = connect();
    let sql = include_str!("schema.sql");
    match conn.execute(sql, &[]).err() {
        Some(e) => println!("Error bootstrapping: {:?}", e),
        None => (),
    }
}

