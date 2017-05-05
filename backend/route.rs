// 3rd-party imports

use hyper::uri::RequestUri::{self, AbsolutePath};
use hyper::method::Method;

// enums

pub enum Route {
    Home,
    FileUpload,
    HumanError(HumanError),
    APIError(APIError),
    Asset(String /* path/to/assets */),
}

pub enum HumanError {
    NotFound, // 404
}

pub enum APIError {
    MethodNotAllowed, // 405
    NotFound, // 404
}

impl Route {
    pub fn process(request_uri: RequestUri, method: Method) -> Self {

        let path = match request_uri {

            AbsolutePath(path) => path,

            _ => {
                return match method {
                    Method::Get => Route::HumanError(HumanError::NotFound),
                    _ => Route::APIError(APIError::NotFound),
                };
            }
        };

        if method == Method::Get && path.starts_with("/assets/") {

            let (_first, rest) = path.split_at("/assets/".len());

            return Route::Asset(rest.to_string());
        }

        match (method, &path[..]) {

            // /
            (Method::Get, "/") => Route::Home,
            (_, "/") => Route::APIError(APIError::MethodNotAllowed),

            // /upload
            (Method::Post, "/upload") => Route::FileUpload,
            (_, "/upload") => Route::APIError(APIError::MethodNotAllowed),

            (Method::Get, _) => Route::HumanError(HumanError::NotFound),
            (_, _) => Route::APIError(APIError::NotFound),
        }
    }
}
