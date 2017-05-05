// rust imports

use std::io::Read;
use std::ffi::OsStr;
use std::path::{PathBuf, Path};
use std::fs::{self, File};
use std::collections::HashMap;

// 3rd-party imports

use rusqlite::Connection;
use rusqlite::types::ToSql;

use hyper::http::h1::HttpReader;
use hyper::buffer::BufReader;
use hyper::net::NetworkStream;
use hyper::header::{Headers, ContentType};
use hyper::mime::{Mime, TopLevel, SubLevel};

use multipart::server::{Multipart, Entries, SaveResult};

use url::percent_encoding::percent_decode;

use mime_types;

use csv;

use chrono::naive::date::NaiveDate;
use chrono::Datelike;

use serde::ser::Serialize;
use serde_json;

// local imports

use route::{Route, HumanError, APIError};
use database::Database;

// statics

lazy_static! {
    static ref MIME_TYPES: mime_types::Types = mime_types::Types::new().unwrap();
}

// enums

pub enum Component {
    Home,
    NotFound,
}

#[derive(Serialize, Debug)]
pub struct JSONResponse {
    pub error: Option<String>,
    pub payload: Option<serde_json::Value>,
}

impl JSONResponse {
    fn error(reason: Option<String>) -> Self {
        JSONResponse {
            error: reason,
            payload: None,
        }
    }

    fn payload<T: Serialize>(value: T) -> Self {
        use serde_json::to_value;
        JSONResponse {
            error: None,
            payload: Some(to_value(value).unwrap()),
        }
    }
}

pub enum AppResponse {
    Component(Component),
    Asset(ContentType, Vec<u8> /* content */),
    MethodNotAllowed,
    NotFound,
    BadRequest,
    InternalServerError,
    JSONResponse(JSONResponse),
}

impl AppResponse {
    pub fn process(db_conn: Database,
                   route: Route,
                   headers: Headers,
                   http_reader: HttpReader<&mut BufReader<&mut NetworkStream>>)
                   -> Self {

        match route {
            Route::Home => AppResponse::Component(Component::Home),
            Route::FileUpload => handle_file_upload(db_conn, headers, http_reader),
            Route::Asset(path_to_asset) => handle_asset(path_to_asset),
            Route::HumanError(human_error) => {
                match human_error {
                    HumanError::NotFound => AppResponse::Component(Component::NotFound),
                }
            }
            Route::APIError(api_error) => {
                match api_error {
                    APIError::MethodNotAllowed => AppResponse::MethodNotAllowed,
                    APIError::NotFound => AppResponse::NotFound,
                }
            }
        }
    }
}

fn handle_asset(path_to_asset: String) -> AppResponse {

    #[inline]
    fn decode_percents(string: &OsStr) -> String {
        let string = format!("{}", string.to_string_lossy());
        format!("{}", percent_decode(string.as_bytes()).decode_utf8_lossy())
    }

    // TODO: inlined resources here

    // URL decode
    let decoded_req_path = Path::new(&path_to_asset).iter().map(decode_percents);

    let starts_with = match Path::new("./assets/").to_path_buf().canonicalize() {
        Err(_) => {
            return AppResponse::Component(Component::NotFound);
        }
        Ok(x) => x,
    };

    let mut req_path = starts_with.clone();
    req_path.extend(decoded_req_path);
    let req_path: PathBuf = req_path;

    // TODO: this is a security bottle-neck
    let req_path = match req_path.canonicalize() {
        Err(_) => {
            return AppResponse::Component(Component::NotFound);
        }
        Ok(req_path) => {

            if !req_path.starts_with(starts_with.as_path()) {
                return AppResponse::Component(Component::NotFound);
            }

            req_path
        }
    };


    match fs::metadata(&req_path) {
        Ok(metadata) => {

            if !metadata.is_file() {
                return AppResponse::Component(Component::NotFound);
            }

            // TODO: better way?
            let path_str = format!("{}", &req_path.to_string_lossy());

            // Set the content type based on the file extension
            let mime_str = MIME_TYPES.mime_for_path(req_path.as_path());

            let mut content_type = ContentType(Mime(TopLevel::Application, SubLevel::Json, vec![]));

            let _ = mime_str.parse().map(|mime: Mime| {
                content_type = ContentType(mime);
            });

            let mut file = File::open(req_path)
                .ok()
                .expect(&format!("No such file: {:?}", path_str));

            let mut content = Vec::new();

            file.read_to_end(&mut content).unwrap();

            return AppResponse::Asset(content_type, content);

        }
        Err(_err) => {
            return AppResponse::Component(Component::NotFound);
        }
    }

}

fn handle_file_upload(db_conn: Database,
                      headers: Headers,
                      http_reader: HttpReader<&mut BufReader<&mut NetworkStream>>)
                      -> AppResponse {

    match process_multipart(headers, http_reader) {
        None => AppResponse::BadRequest,
        Some(mut multipart) => {

            match multipart.save().temp() {
                SaveResult::Full(entries) => process_entries(db_conn, entries),
                SaveResult::Partial(_entries, error) => {

                    println!("Errors saving multipart:\n{:?}", error);
                    // TODO: fix
                    // process_entries(entries.into())

                    AppResponse::BadRequest
                }
                SaveResult::Error(error) => {
                    println!("Errors saving multipart:\n{:?}", error);
                    // Err(error)
                    AppResponse::BadRequest
                }
            }

        }
    }
}

fn process_entries(db_conn: Database, entries: Entries) -> AppResponse {

    let files = match entries.files.get("uploads[]") {
        Some(files) => {
            if files.len() <= 0 {
                return AppResponse::BadRequest;
            }
            files
        }
        None => {
            return AppResponse::BadRequest;
        }
    };

    let mut expense_tracker = ExpenseTracker::new();
    let mut records = vec![];

    for file in files {
        let mut reader = match csv::Reader::from_file(file.path.clone()) {
            Ok(reader) => reader.has_headers(true),
            Err(error) => {
                // TODO: error
                println!("error: {}", error);
                return AppResponse::InternalServerError;
            }
        };

        for record in reader.decode() {
            let (date,
                 category,
                 employee_name,
                 employee_address,
                 expense_description,
                 pre_tax_amount,
                 tax_name,
                 tax_amount): (String,
                                           String,
                                           String,
                                           String,
                                           String,
                                           String,
                                           String,
                                           String) = match record {
                Ok(x) => x,
                Err(_) => {
                    return AppResponse::BadRequest;
                }
            };

            let pre_tax_amount: f64 = {
                let pre_tax_amount = pre_tax_amount.trim().replace(",", "");

                match pre_tax_amount.parse::<f64>() {
                    Ok(x) => x,
                    Err(_) => {
                        return AppResponse::BadRequest;
                    }
                }
            };

            let tax_amount: f64 = {
                let tax_amount = tax_amount.trim().replace(",", "");
                match tax_amount.parse::<f64>() {
                    Ok(x) => x,
                    Err(_) => {
                        return AppResponse::BadRequest;
                    }
                }
            };

            let new_date = match NaiveDate::parse_from_str(&date, "%_m/%e/%Y") {
                Ok(x) => x,
                Err(_) => {
                    return AppResponse::BadRequest;
                }
            };

            let record = Record(date,
                                category,
                                employee_name,
                                employee_address,
                                expense_description,
                                pre_tax_amount,
                                tax_name,
                                tax_amount);

            records.push(record);

            expense_tracker.add(new_date, pre_tax_amount + tax_amount);
        }
    }

    add_to_database(db_conn, records);

    return AppResponse::JSONResponse(JSONResponse::payload(expense_tracker));
}

fn add_to_database(db_connnection: Database, records: Vec<Record>) {

    for record in records {

        let Record(date,
                   category,
                   employee_name,
                   employee_address,
                   expense_description,
                   pre_tax_amount,
                   tax_name,
                   tax_amount) = record;

        let query = format!("
            INSERT INTO ExpenseHistory(date, category, \
                             employee_name, employee_address, expense_description, \
                             pre_tax_amount, tax_name, tax_amount)
            VALUES (:date, \
                             :category, :employee_name, :employee_address, :expense_description, \
                             :pre_tax_amount, :tax_name, :tax_amount);
        ");

        let params: &[(&str, &ToSql)] = &[(":date", &date),
                                          (":category", &category),
                                          (":employee_name", &employee_name),
                                          (":employee_address", &employee_address),
                                          (":expense_description", &expense_description),
                                          (":pre_tax_amount", &pre_tax_amount),
                                          (":tax_name", &tax_name),
                                          (":tax_amount", &tax_amount)];

        db_write_lock!(db_conn; db_connnection.clone());
        let db_conn: &Connection = db_conn;

        match db_conn.execute_named(&query, params) {
            Err(sqlite_error) => {
                panic!("{:?}", sqlite_error);
            }
            _ => {
                /* query sucessfully executed */
            }
        }

    }

}

fn process_multipart<R: Read>(headers: Headers, http_reader: R) -> Option<Multipart<R>> {
    let boundary = headers.get::<ContentType>().and_then(|ct| {

        use hyper::mime::{Mime, TopLevel, SubLevel, Attr, Value};

        let ContentType(ref mime) = *ct;
        let params = match *mime {
            Mime(TopLevel::Multipart, SubLevel::FormData, ref params) => params,
            _ => return None,
        };

        params.iter()
            .find(|&&(ref name, _)| match *name {
                Attr::Boundary => true,
                _ => false,
            })
            .and_then(|&(_, ref val)| match *val {
                Value::Ext(ref val) => Some(&**val),
                _ => None,
            })
    });

    match boundary.map(String::from) {
        Some(boundary) => Some(Multipart::with_body(http_reader, boundary)),
        None => None,
    }
}

#[derive(Eq, PartialEq, Hash, Serialize)]
enum Month {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December,
}

#[derive(Serialize)]
struct ExpenseTracker(HashMap<Month, f64>);

impl ExpenseTracker {
    fn new() -> Self {
        ExpenseTracker(HashMap::new())
    }

    fn add(&mut self, date: NaiveDate, expenses: f64) {

        let month = match date.month() {
            1 => Month::January,
            2 => Month::February,
            3 => Month::March,
            4 => Month::April,
            5 => Month::May,
            6 => Month::June,
            7 => Month::July,
            8 => Month::August,
            9 => Month::September,
            10 => Month::October,
            11 => Month::November,
            12 => Month::December,
            _ => unreachable!(),
        };

        if self.0.contains_key(&month) {
            let entry = self.0.get_mut(&month).unwrap();
            *entry = *entry + expenses;
            return;
        }

        self.0.insert(month, expenses);
    }
}

struct Record(String, String, String, String, String, f64, String, f64);
