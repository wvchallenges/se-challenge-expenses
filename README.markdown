# Wave Software Development Challenge

This project is a simple application developed for Wave's SE Challenge [here](https://github.com/wvchallenges/se-challenge).

## Application notes
### What it does
It is a web application that supports uploading an Employee Expense CSV file into an in-memory database, displaying the aggregated expenses per month upon successful upload. 

### Languages/technologies used
As I am not well-versed in Ruby/Ruby on Rails or Python/Django, it was developed using Java, Spring, and Thymeleaf with bootstrap for styling. It also uses an in-memory H2 database for easy set-up, which can be easily swapped out for on-disk database if necessary.

### Development notes
1. My primary focus in developing this web-app was on the back-end domain model. This is the area I'm most familiar with, as most of my professional career has been spent working on back-end RESTful web-services.
2. If the application was larger, I'd be tempted to develop an entirely separate RESTful microservice (my strong point) for managing the database and have the UI component as another separate application. However given the size and simplicity of the project, this was unnecessary.
2. Equal attention, but less expertise was spent on the front-end views, as front-end is not my strong point but was fun to play with.
3. I focused on making the domain model as clean, extensible, and abstract as possible to support scalability and maintainability.
4. Basic error handling was added, despite the project specs stating certain assumptions could be made, because I couldn't help adding it. The controller handling file uploads handles errors with file type, empty files, and files with unexpected format.
5. Some of the CSV parsing functionality was abstracted to support uploading of other domain types by CSV in the future, since it seemed like a probable future requirement.

## Setup

The application can be easily built and deployed using maven and spring-boot. Simply run `mvn spring-boot:run` from the root of the cloned application repository. Detailed steps below:

1. To run the application you'll need [Maven 3.0+](http://maven.apache.org/download.cgi) and [JDK 1.8 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html).
2. Clone the project to your local machine (`git clone https://github.com/tannner/se-challenge.git`) or download the project zip (https://github.com/tannner/se-challenge/archive/master.zip)
3. Navigate (cd) into the root directory of the cloned/downloaded project (se-challenge) and run `mvn spring-boot:run`

Once the above steps are complete, the application should be up and running. You can navigate to http://localhost:8080 in your favorite browser to play with the application. If you experience errors, please email rutgers.tanner@gmail.com and ridicule him.

## Viewing the database

Since the database is currently in-memory, all tables are dropped and re-created per application startup. If you want to view the database for the currently running instance, follow the steps below:

1. Navigate to http://localhost:8080/h2-console in your browser
2. Login to the H2 console using the settings below:
  * __Driver Class:__ org.h2.Driver
  * __JDBC URL:__ jdbc:h2:mem:mydb
  * __User Name:__ sa
  * __Password:__ [blank]
  
  ![H2 settings](http://i.imgur.com/smT0nEa.png?1)

3. The EMPLOYEE_EXPENSE table can be queried with standard SQL



__If you have any questions or issues, please email rutgers.tanner@gmail.com__
