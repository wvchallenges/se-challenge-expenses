## Project Description
Imagine that Wave has just acquired a new company. Unfortunately, the company has never stored their data in a database, and instead uses a comma separated text file. We need to create a way for the new subsidiary to import their data into a database. Your task is to create a web interface that accepts file uploads, and then stores them in a relational database.

### What your web-based application must do:

1. Your app must accept (via a form) a comma separated file with the following columns: date, category, employee name, employee address, expense description, pre-tax amount, tax name, and tax amount.
1. You can make the following assumptions:
 1. Columns will always be in that order.
 2. There will always be data in each column.
 3. There will always be a header line.

 An example input file named `data_example.csv` is included in this repo.

1. Your app must parse the given file, and store the information in a relational database.
1. After upload, your application should display a table of the total expenses amount per-month represented by the uploaded file.

Your application should be easy to set up, and should run on either Linux or Mac OS X. It should not require any non open-source software.

### Documentation:

## Project CSVisualizer 

#### Overview

* This app lets the user upload/drag CSV files with specified format and parses it and presents the reuslt in readable format.
* It was made with ASP. NET CORE framework - Microsoft's newest fully open-sourced framework on a Mac using Visual Studio Code 
* It uses Model-View-Controller pattern for seperation of concerns. It uses PostgreSQL as the relational database. 
* I used ServiceStack open source library for importing CSV files into Objects. 
* I used ORM (Object Relational Mapper) capability of ServiceStack framework for interaction with database tables. It gives me the freedom to 
    swap the database if needed and presents an easily manageble abstraction layer between database and application. 
* I used Semantic UI as my front-end UI framework because it allows me to use readable syntax for modifying UI and has 
    some really nice UI elements.
* Though it cotains DockerFile but it is not sufficient as it came with ASP .NET core template I used. 


### Installing and Running the Project 





