/// main.swift
/// se-challenge-expenses solution in Swift
/// by Xiaoquan (Rockford) Wei, Feb 26, 2018

/// a Perfect Web Server prefers a pure json style scheme.
/// By such a design, the web server can apply such an architecture:
/// - model.swift, a pure data model file to serve data model
/// - main.swift, a http server route controller
/// - index.html, a static html page to view the data


/// Perfect is Server Side Swift
import PerfectLib

/// importing essential components from Perfect Web Server
import PerfectHTTP
import PerfectHTTPServer

/// other essential libraries from Apple Inc., such as json
import Foundation

/* This demo setup 5 different routes to handle the HTTP requests
 - /upload: allow user to upload a CSV file
 - /record: return database records in json format
 - /summary: return an expense summary in months
 - /halt: **only for demo purpose**, to stop the server after demo
 - others: for static files
*/

/// uploader handler
/// - parameter request: upload request in method POST, **MUST BE** a CSV file
/// - parameter response: upload response, return a json with error message, if failed
func handlerUpload(request: HTTPRequest, response: HTTPResponse) {
  let err: String

  // look for uploaded files
  if let uploads = request.postFileUploads,
    let source = uploads.first {
    do {

      // this is only for a demo, clean the database to avoid duplicated record with the same testing data
      let _ = unlink(ExpenseModel.databasePath)

      // convert the uploaded file into database backbone
      let _ = try ExpenseModel(csvSourcePath: source.tmpFileName, sqlitePath: ExpenseModel.databasePath)
      err = ""
    } catch {
      err = "\(error)"
    }
  } else {
    debugPrint(request.postBodyString ?? "")
    err = "no uploads"
  }
  response.setHeader(.contentType, value: "text/json")
    .setBody(string: "{\"error\": \"\(err)\"}\n")
    .completed()
}

/// record handler
/// - parameter request: upload request, with no parameters required.
/// - parameter response: upload response in json data
func handlerRecord(request: HTTPRequest, response: HTTPResponse) {
  var body = ""
  do {
    // load the imported data by some default settings.
    let e = try ExpenseModel(sqlitePath: ExpenseModel.databasePath)
    let rec = try e.fetch(limit: 100)

    // turn the result into json
    let json = JSONEncoder()
    let data = try json.encode(rec)
    body = String(bytes: data, encoding: .utf8) ?? "{\"error\": \"json failure\"}\n"
  } catch {
    body = "{\"error\": \"\(error)\"}\n"
  }
  response.setHeader(.contentType, value: "text/json")
    .setBody(string: body)
    .completed()
}

/// report summary handler
/// - parameter request: upload request, with no parameters required.
/// - parameter response: upload response in json data
func handlerSummary(request: HTTPRequest, response: HTTPResponse) {
  var body = ""
  do {

    // load a summary report
    let e = try ExpenseModel(sqlitePath: ExpenseModel.databasePath)
    let report = try e.summary()

    // turn the result into json
    let json = JSONEncoder()
    let data = try json.encode(report)
    body = String(bytes: data, encoding: .utf8) ?? "{\"error\": \"json failure\"}\n"
  } catch {
    body = "{\"error\": \"\(error)\"}\n"
  }
  response.setHeader(.contentType, value: "text/json")
    .setBody(string: body)
    .completed()
}

/// easy route to stop the web server
/// - parameter request: upload request, with no parameters required.
func handlerHalt(request: HTTPRequest, response: HTTPResponse) {
  exit(0)
}


/// configure the above routes to the server.
let confData = [
  "servers": [
    [
      "name":"localhost",
      "port":8181,
      "routes":[
        ["method":"post", "uri":"/upload", "handler":handlerUpload],
        ["method":"get", "uri":"/record", "handler":handlerRecord],
        ["method":"get", "uri":"/summary", "handler":handlerSummary],
        ["method":"get", "uri":"/halt", "handler": handlerHalt],
        ["method":"get", "uri":"/**",
         "handler": PerfectHTTPServer.HTTPHandler.staticFiles,
         "documentRoot":"./webroot"],
      ]
    ]
  ]
]

/// start the web server.
do {
  try HTTPServer.launch(configurationData: confData)
} catch {
  fatalError("\(error)")
}
