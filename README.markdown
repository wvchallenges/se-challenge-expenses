# Wave Software Development Challenge
This was built using react, node, express, and sqlite. It was built using Visual Studio Code using NodeJS v6.3.1, for proper intellisense support using typings and easy debugging Visual Studio Code is recommended, however any text editor should do. This should also run properly in older versions of NodeJS due to the usage of babel-node, however this has not been tested.

## Installation Instructions
Project installation:
    npm install

## Build and Running Instructions
To run the server:
    npm run start:server

To build and run the client:
    npm run start:client

## Usage
http://localhost:8080

Once you have navigated to the above URL a simple form will be displayed allowing you to upload a CSV file, the total monthly expenses will then be displayed in a table below.

## Notes
- The client UI was left very minimal due to time constraints, most of the effort was spent on the server.
- The SQLite DB is in memory so each time the server is restarted the DB will be re-initialized.
- Access to the SQLite DB is completely encapsulated within server/DataManager.js so it can easily be replaced with a proper DB at a later point if necessary.
- server/BusinessLayer.js and server/DataAccessLayer.js were built to be loosely coupled with their dependencies injected through the constructor to allow for proper seperation of concerns and the addition of easy unit testing if necessary.
- ES6 Promises were used to alleviate the callback hell that can quickly arise when working in NodeJS applications.