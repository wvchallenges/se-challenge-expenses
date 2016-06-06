
extern crate csv;
extern crate iron;
extern crate router;
extern crate chrono;
extern crate postgres;
extern crate itertools;
extern crate multipart;
extern crate staticfile;
extern crate rustc_serialize;

mod expenses;
mod db;

use staticfile::Static;

use iron::prelude::*;
use iron::status;

use router::Router;
use multipart::server::Multipart;

use rustc_serialize::json;

use std::env;

fn upload_handler(request: &mut Request) -> IronResult<Response> {
    match Multipart::from_request(request) {
        Ok(mut multipart) => {
            match multipart.read_entry() {
                Ok(entry) => {
                    let expenses = expenses::from_csv(entry.unwrap().data.as_file().unwrap());
                    let mut conn = db::connect();
                    for expense in expenses.iter() {
                        expenses::insert(expense, &mut conn);
                    }

                    let by_month = expenses::total_by_month(expenses.into_iter());

                    Ok(Response::with((status::Ok, json::encode(&by_month).unwrap())))
                },
                Err(_) => Ok(Response::with((status::BadRequest, "No entries in payload")))
            }
        },
        Err(_) => {
            Ok(Response::with((status::BadRequest, "The request is not multipart")))
        }
    }
}

fn main() {
    db::bootstrap();
    let mut router = Router::new();
    router.get("/", Static::new("res/"));
    router.post("/upload", upload_handler);

    let address = env::var("HTTP_LISTEN").unwrap_or("localhost:3000".to_string());

    println!("Browse to http://{}", address);

    Iron::new(router).http(address.as_str()).unwrap();
}

