// swift-tools-version:4.0
/// a Perfect Web Server prefers a pure json style scheme.
/// By such a design, the web server can apply such an architecture:
/// - model.swift, a pure data model file to serve data model
/// - main.swift, a http server route controller
/// - index.html, a static html page to view the data

import PackageDescription

let package = Package(
    name: "csvsql",
    dependencies: [
        .package(url: "https://github.com/yaslab/CSV.swift.git", from: "2.1.0"),
        .package(url: "https://github.com/PerfectlySoft/Perfect-HTTPServer.git", from: "3.0.0"),
        .package(url: "https://github.com/PerfectlySoft/Perfect-SQLite.git", from: "3.0.0")
    ],
    targets: [
        .target(
            name: "csvsql",
            dependencies: ["CSV", "PerfectHTTPServer", "PerfectSQLite"]),
    ]
)
