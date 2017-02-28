# Wave Software Development Challenge

### Original Project Requirement
1. Your app must accept (via a form) a comma separated file with the following columns: date, category, employee name, employee address, expense description, pre-tax amount, tax name, and tax amount.
1. You can make the following assumptions:
 1. Columns will always be in that order.
 2. There will always be data in each column.
 3. There will always be a header line.
 
 An example input file named `data_example.csv` is included in this repo.

1. Your app must parse the given file, and store the information in a relational database.
1. After upload, your application should display a table of the total expenses amount per-month represented by the uploaded file.

## Instructions on how to build/run application
1. My application runs on Node.js (using Express) & MongoDB (using Mongoose).  I didn't use Angular here as the setup is fairly straight forward (so didn't demonstrate a full 'MEAN stack' setup). 
2. To run, please have Node.js & MongoDB installed.  You can download the latest version from https://nodejs.org/en/download/ & https://docs.mongodb.com/manual/installation/.
3. Once you have both installed (you also need to specify a db folder for MongoDB), please run MongoDB on Port 27017 (can simply click on mongodb.exe, the default port should be using 27017).  You can also exeucte it with a port number like this in cmd:  mongod --port 27017
4. Please create a new DB called 'se-challenge-expenses'
5. Clone this project, and cd to this folder.
6. Run "npm install" to include all modules required.
7. Run "npm start" to start server.
8. Open up any browser, and load url: http://localhost:3000/

## What I like in my implementation, and why.
1. I have been using Node.js and Express to setup small application and really liked it as I find it being quite easy and quick.  In this case, I setup 1 model (which is called 'record') for the DB, and the rest of the setup is mainly done through 1 index.js (in route, with one GET and POST), 1 view using EJS and that's about it.  A lot of the processing was done through using 3rd party node libraries that are available, such as parsing CSVs, so I don't have to parse the content on my own.  (Note: I haven't done Python but I believe Python and Node have similar methodology so should be easy to learn.)
2. I added some basic bootstrap styling to make the UI a little bit nicer.
3. Allow uploading CSV in the UI so you can upload multi CSVs to combine the list and total.  Delete button will remove all so you can start over again.
