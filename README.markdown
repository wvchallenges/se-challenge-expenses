# Wave Software Development Challenge

### Overview:
For this challenge I have utilized Java and Spring Boot. If you are new to these technologies, or need some direction, a good place to start reading my code is in the CsvController.java file. 

### Setup:

1. Install Java (I have run and tested the application using Java 8)
1. Install Maven (Maven is a build and dependency resolution tool)
1. In the root directory of the project, run:
`mvn spring-boot:run`
1. After all dependencies are downloaded and the application starts, it will be available at [http://localhost:8080](http://localhost:8080)

### Accomplishments:

This is a minimal setup for a Spring Boot web application that connects to a relational database. If the requirements were expanded to store more types of data in the database, it would be straight forward to add in more Java classes that represent new tables. The included JUnit test demonstrates how to use Spring repositories for simple CRUD. 

For the monthly report, it seemed natural to use a Group By query which deviated a little bit from the standard ORM. A SQL database will be more optimized than a web server for aggregating a monthly report such as this, and will reduce the in-memory requirements of the web server.

The project includes an in-memory relational database, which makes it very easy to test and setup for new developers. Connecting to a remote database should be as easy as adding in the connection details. 

The front-end is a simple one page application that uses AJAX and a 3rd party table library [handsontable](https://handsontable.com/). For a more complicated web application, it would be appropriate to add in a separate front end framework such as React.