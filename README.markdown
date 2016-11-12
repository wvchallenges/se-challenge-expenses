# Wave Software Development Challenge

## Project

Imagine that Wave has just acquired a new company. Unfortunately, the company has never stored their data in a database, and instead uses a comma separated text file. We need to create a way for the new subsidiary to import their data into a database. Your task is to create a web interface that accepts file uploads, and then stores them in a relational database.

## Description

This solution uses NodeJS and Postgres. The project is structured with an api service (*server package*), and seperate static web files (*public package*). It is logically structured and easily extensible to add more routes, and more services on top of the existing **Expenses** domain. The project has minimal dependencies, and is easy to understand. There are 3 entity models: Employees, Categories, and Expenses. Address could potentially be split into its own table, but for simplicity in this case, it remains directly on the Employee object.

The web layer is very simple and uses AngularJS to display the agregated monthly expense reports. Gulp is used so that the project auto-reloads during development.

## Assumptions

As mentioned in the project description, there are major assumptions that order of columns in the csv file format will never change, columns cannot have blank values, etc (regular risks of csv). In order to provide some handling for this, a configuration object exists in *server/api/expense/expense.service.js* to map csv column indexes to expected data fields. In terms of error checking, a quick check is done to verify that the header line of the csv file is correct after upload, before processing and storage.

## Dependencies

1. Install Postgres [Download](https://www.postgresql.org/download/)
2. Install NodeJS [Download](https://nodejs.org/en/download/)

## Build

1. npm install
2. psql -f server/expenses.sql

## Test
1. npm test

## Deploy
1. npm start
2. open http://localhost:9000
 
