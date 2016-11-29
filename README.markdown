# Wave Software Development Challenge

## Project Description

### munchmunch (v1)

A simple csv parsing app that returns monthly expenses.

### Core

- PapaParse v4.1.2
- angularjs v1.5.9
- expressjs v4.14.0
- nodejs v6.9.1
- mongodb v3.2.11

### Build/Run Instructions:

1. install MongoDB
2. run "mongod" service (default port: 27012)
3. install NodeJS
4. goto munchmunch/ directory
5. run "npm install"
6. goto munchmunch/app directory
7. run "node server.js"
8. open localhost:3000 in browser


## Submission Thoughts

I built an application using the MEAN stack, I've had experience with NodeJS/ExpressJS and AngularJS before, but not much with MongoDB. I'm happy I got to spend time with it. I spent some time diving into the Aggregration Pipeline MongoDB provides for querying databases and learning the difference between that choice and using MongoDB's MapReduce. 

I also used PapaParse which is a fast in-browser csv parser (can use workers for multi-threading), the intention behind this was that sensitive confidential information could be processed locally on the client side. 

I'm also happy I got to visualise the results using an angular chart extension. I would've liked (with more time) to incorporate visual library D3js into the Angular controller with directives. I intended to visualise more interesting things like the location of the employees visualised on a Cloropeth map. I thought visualised data would be useful for a company acquisition process for perhaps considering new offices, employees with high spending patterns, most frequent types of expenses and etc.

##Look

![alt tag](http://i.imgur.com/U0SqDgU.jpg)
