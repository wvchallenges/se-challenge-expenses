# Note to Reviewer

Implementation details and instructions are appended at the very end of this readme file.

# Wave Software Development Challenge
Applicants for the [Software developer](https://wave.bamboohr.co.uk/jobs/view.php?id=1) role at Wave must complete the following challenge, and submit a solution prior to the onsite interview. 

The purpose of this exercise is to create something that we can work on together during the onsite. We do this so that you get a chance to collaborate with Wavers during the interview in a situation where you know something better than us (it's your code, after all!) 

There isn't a hard deadline for this exercise; take as long as you need to complete it. However, in terms of total time spent actively working on the challenge, we ask that you not spend more than a few hours, as we value your time and are happy to leave things open to discussion in the onsite interview.

Please use whatever programming language and framework you feel the most comfortable with.

Feel free to email [dev.careers@waveapps.com](dev.careers@waveapps.com) if you have any questions.

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

There are many ways that this application could be built; we ask that you build it in a way that showcases one of your strengths. If you you enjoy front-end development, do something interesting with the interface. If you like object-oriented design, feel free to dive deeper into the domain model of this problem. We're happy to tweak the requirements slightly if it helps you show off one of your strengths.

### Documentation:

Please modify `README.md` to add:

1. Instructions on how to build/run your application
1. A paragraph or two about what you are particularly proud of in your implementation, and why.

## Submission Instructions

1. Fork this project on github. You will need to create an account if you don't already have one.
1. Complete the project as described below within your fork.
1. Push all of your changes to your fork on github and submit a pull request. 
1. You should also email [dev.careers@waveapps.com](dev.careers@waveapps.com) and your recruiter to let them know you have submitted a solution. Make sure to include your github username in your email (so we can match applicants with pull requests.)

## Alternate Submission Instructions (if you don't want to publicize completing the challenge)
1. Clone the repository.
1. Complete your project as described below within your local repository.
1. Email a patch file to [dev.careers@waveapps.com](dev.careers@waveapps.com)

## Evaluation
Evaluation of your submission will be based on the following criteria. 

1. Did you follow the instructions for submission? 
1. Did you document your build/deploy instructions and your explanation of what you did well?
1. Were models/entities and other components easily identifiable to the reviewer? 
1. What design decisions did you make when designing your models/entities? Why (i.e. were they explained?)
1. Did you separate any concerns in your application? Why or why not?
1. Does your solution use appropriate datatypes for the problem as described? 

## Project Solution

### Application Design

The application is built as 2 parts separating the front-end and back-end portions.

1. A REST API backend service
2. A Client UI app built as a Single Page App

The backend service is implemented in Java using Spring Boot. H2 database that is bundled within Spring Boot is used for storage.

The front-end UI app is built with Angular and communicates over REST with the backend service.

### Pre-requisites

The implementation requires Java, Maven, Node, NPM, and Bower. If needed, refer to the following websites to install them.

http://www.oracle.com/technetwork/java/javase/overview/index.html
http://maven.apache.org
https://nodejs.org
https://bower.io/

The H2 database does not require separate installation.


### Installation, Build, and Execution

The git repo has 2 modules

A. /expense-service/
B. /expense-client/

#### First, build and run the /expense-service/ using:

1. cd into /expense-service/ folder that contains the pom.xml file.
2. Run 'mvn install'.
3. Run 'java -jar target/expense-service-1.0.jar'


This will run the backend service application. Note: When step 2 successfully runs, it would have created the /target/ folder and the executable .jar file inside it.

#### Second, build and run the /expense-client/ using:

1. Run 'npm start'.
2. Go to 'http://localhost:8000/' in the browser to view the application.

Note: The first time 'npm start' is run, it may take some time to download and install the dependencies. The 'npm start' command is configured to automatically invoke 'npm install' and 'bower install'.

#### Terminating the application

On the console, type 'Ctrl+C' and press enter to terminate each of the above.

#### Additional notes

The first time the application is run, a 'projectdatabase' folder will be creaed inside the /expense-service/ directory to store the data. Each time the application is restarted, the database will be reinitialized and all previous data will be erased.

This can be changed to persist the data between restarts. But I've not included additional instructions considering the present implementation sufficient for the purposes for this exercise.

Only minimal error handling is provided. Further details are left to be discussed at a later point.