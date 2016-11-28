# Documentation

## Requirements
* Node 0.10.x
* Postgressql 9.1.x

## Getting Started
1. Clone the repository
2. Run `npm install`
3. Using Postgres.app create a database by running `CREATE DATABASE expenses`
4. Run `npm run createtable` for creating the necessary tables to be used
5. Run `npm start` and visit `localhost:3000`

## Challenges
After inserting the data, I needed a way to retrieve the data that was just uploaded without including the ones from previous uploads. The solution that worked for me was to insert the data in a permanent table and a temporary table. By inserting in a temporary table, I can just retrieve all the data without having to keep track of which id I inserted the data into.

At first I tried to manipulate the retrieved data using JavaScript to calculate the monthly expenses, but it seemed like I was doing a lot of formatting, such as having to remove the comma from a money variable to parse it into a Number or dealing with the date. I ended up using a query to talk to the database directly to make things a lot simpler that would do all the work for me in less code.