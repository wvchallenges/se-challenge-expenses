# Wave Software Development Challenge
## Project Description
Imagine that Wave has just acquired a new company. Unfortunately, the company has never stored their data in a database, and instead uses a comma separated text file. We need to create a way for the new subsidiary to import their data into a database. Your task is to create a web interface that accepts file uploads, and then stores them in a relational database.

### Documentation:

1. Instructions on how to build/run your application
  1. Install packages:
  ```
  npm install
  ```
  2. Setup local mysql database:
  ```
  mysql -u -root -p
  ```
  Then change connection password in /modules/db-bridge.js to root password
1. A paragraph or two about what you are particularly proud of in your implementation, and why.

  This project is built with the technologies I'm most familiar with: Nodejs + Angularjs. In summary, I took the express app framework, and integrated Angularjs components. I try to keep the overall design simple and clean, with different components separated for easy maintenance.

  For front-end, I implemented a simple MVC pattern using Angularjs. I created a single controller for the home page of the web app, which uses its service to handle http requests for file uploading and data fetching. In addition, routing is done using the flexible ui-router package.

  For back-end, requests are handled by the nodejs server. I also created a custom node module for database operations and csv parsing. Async package is used to handle asynchronous query calls to the database, making sure responses are sent at right times. CSV file is also parsed here to have the appropriate datatypes stored in the database.

  For database, I used a local instance of mysql as a proof-of-concept. For demonstration purpose only, the connection credentials are kept in clear text in the project. If a production database instance were used, I would use habitat to store credentials in environment variables.

  Overall I'm quite happy with this implementation, and I look forward to discuss it further will you!
