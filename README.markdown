This project requires installation of both the frontend (Angular) UI, as well as this API

# Setup

* install PostgreSQL
* create database called `wave`
* `sudo npm install -g db-migrate`
* `npm install`
* `db-migrate up` (installs schema needed by DB/API, pass in `PG_USER` and `PG_PASS` environment variables if needed to allow this API to authenticate to your PostgreSQL DB)
* `node server.js` (pass in `PG_USER` and `PG_PASS` environment variables if needed to allow this API to authenticate to your PostgreSQL DB)

# Unit Tests

* `npm test`  (for CSV input validation)

# Design decisions

* Database credentials passed through via environment variable, this is more secure than posting credentials to a code repository. These variables would be managed by some sort of container/VM automation tool like Chef/Ansible/Puppet
* Date conversion to ISO 8601 standard since this the default PGSQL date format
* Promise based PostgreSQL workflow (via the pg-promises driver, which is a fork of node-postgres)
* Third party CSV parser (figured this was a time saver over coming up with a reliable regexp pattern)
* CSV input validation (originally this was to assist with unit testing, but see problems section below)
* PostgreSQL transactions (COMMIT + ROLLBACK support for integrity of data)
* DB migrations for portability of schema and ease of management within teams
* DB used to group expenses by date. The were originally unsorted, and databases are good at sorting stuff
* Added display of the number of expenses for the month. Although not required this seemed like useful info
* Unit tests - a valiant effort, tests are good!
* Data manipulation in the backend, I like my clients to be dumb and not have to do much other than display data provided by the API.

# Problems

* Although the unit test is showing the test passing, this is not working properly. I struggled with race conditions involving the CSV parser (which doesn't support Javascript promises) and this workflow. If I had gotten this to work I would have manipulated the data mock to test the validation. I would have also figured out how to call the `createExpenses` function directly from within the unit tests rather than the separate `testParser` function
* A second iteration through the expense summary results was necessary to round to two decimal places and deal with some funky Javascript floating point issues. There is probably a better workaround here?
