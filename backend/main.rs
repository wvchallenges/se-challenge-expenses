extern crate hyper;
extern crate horrorshow;
extern crate multipart;
#[macro_use]
extern crate mime;
extern crate url;
#[macro_use]
extern crate lazy_static;
extern crate conduit_mime_types as mime_types;
extern crate csv;
extern crate chrono;
#[macro_use]
extern crate serde_derive;
extern crate serde;
extern crate serde_json;
extern crate rusqlite;

// modules

#[macro_use]
mod database;
mod route;
mod response;
mod render;

// rust imports

// 3rd-party imports

use hyper::server::{Server, Request, Response};

// local imports

use route::Route;
use response::AppResponse;
use database::Database;

fn handler(db_conn: Database, http_request: Request, http_response: Response) {

    let (_socket_address, method, headers, request_uri, _http_version, http_reader) =
        http_request.deconstruct();

    let route = Route::process(request_uri, method);

    let app_response = AppResponse::process(db_conn, route, headers, http_reader);

    render::render(app_response, http_response);
}


fn main() {

    // set up database

    let db_conn = database::get_database("database.sqlite".to_string());

    // set up server

    let host_and_port = "0.0.0.0:9999";

    let server = Server::http(&host_and_port).unwrap();


    let _guard = server.handle(move |http_request: Request, http_response: Response| {
            handler(db_conn.clone(), http_request, http_response)
        })
        .unwrap();

    println!("Listening on http://{}", host_and_port);

}
