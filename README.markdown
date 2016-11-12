# Wave Software Development Challenge

## Project

Imagine that Wave has just acquired a new company. Unfortunately, the company has never stored their data in a database, and instead uses a comma separated text file. We need to create a way for the new subsidiary to import their data into a database. Your task is to create a web interface that accepts file uploads, and then stores them in a relational database.

## Description

This solution uses NodeJS and Postgres. The project is structured with an api service (*server package*), and seperate static web files (*public package*). It is logically structured and easily extensible to add more routes, and more services on top of the existing **Expenses** domain. The project has minimal dependencies, and is easy to understand. There are 3 entity models: Employees, Categories, and Expenses. Address could potentially be split into its own table, but for simplicity in this case, it remains directly on the Employee object.

The web layer is very simple and uses AngularJS to display the agregated monthly expense reports. Gulp is used so that the project auto-reloads during development.

## Dependencies

1. Install Postgres [Download](https://www.postgresql.org/download/)
2. Install NodeJS [Download](https://nodejs.org/en/download/)

## Build

1. npm install
2. psql -f server/expenses.sql

## Deploy
 1. npm start
 2. open http://localhost:9000
 
