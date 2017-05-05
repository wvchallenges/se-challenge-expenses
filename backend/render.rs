// 3rd-party imports

use hyper::server::Response;
use hyper::header::ContentType;
use hyper::status::StatusCode;

use serde_json;

// local imports

use response::{AppResponse, Component};

// functions

pub fn render(app_response: AppResponse, mut http_response: Response) {

    match app_response {

        AppResponse::Component(component) => {
            match component {
                Component::Home => {

                    let home_template = include_str!("index.html");

                    http_response.headers_mut().set((ContentType(mime!(Text / Html))));
                    http_response.send(home_template.as_bytes()).unwrap();

                }
                Component::NotFound => {

                    let not_found_template = include_str!("not_found.html");
                    http_response.headers_mut().set(ContentType(mime!(Text / Html)));

                    *http_response.status_mut() = StatusCode::NotFound;
                    http_response.send(not_found_template.as_bytes()).unwrap();

                }
            }
        }

        AppResponse::Asset(content_type_header, content) => {
            http_response.headers_mut().set(content_type_header);
            http_response.send(&content).unwrap();
        }

        AppResponse::JSONResponse(json_response) => {

            let json_response_string = serde_json::to_string(&json_response).unwrap();

            http_response.headers_mut().set(ContentType(mime!(Application / Json)));
            http_response.send(json_response_string.as_bytes()).unwrap();
        }

        AppResponse::MethodNotAllowed => {
            *http_response.status_mut() = StatusCode::MethodNotAllowed;
            let message = format!("{}", StatusCode::MethodNotAllowed);
            http_response.send(message.as_bytes()).unwrap();
        }

        AppResponse::NotFound => {
            *http_response.status_mut() = StatusCode::NotFound;
            let message = format!("{}", StatusCode::NotFound);
            http_response.send(message.as_bytes()).unwrap();
        }

        AppResponse::BadRequest => {
            *http_response.status_mut() = StatusCode::BadRequest;
            let message = format!("{}", StatusCode::BadRequest);
            http_response.send(message.as_bytes()).unwrap();
        }

        AppResponse::InternalServerError => {
            *http_response.status_mut() = StatusCode::InternalServerError;
            let message = format!("{}", StatusCode::InternalServerError);
            http_response.send(message.as_bytes()).unwrap();
        }

        // TODO: remove
        // AppResponse::Ok => {
        //     *http_response.status_mut() = StatusCode::Ok;
        //     let message = format!("{}", StatusCode::Ok);
        //     http_response.send(message.as_bytes()).unwrap();
        // }
    }
}
