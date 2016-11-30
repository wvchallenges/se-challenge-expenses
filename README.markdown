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

# Candidate Response:  Warren Spencer

Hello, this is my response to the se-challenge project in github.  

# Building and Running

As approved by you, my response is implemented
in the AWS cloud using a serverless Lambda-based approach.  More on that later, but it means you can't install
and run it locally, so there's nothing to build.  Instead, I'll leave it available in the cloud for you to verify, 
and of course, you can
review the source code contained in this repository.  As you would expect, the code in the Client directory runs
in the browser, and the code in the Server directory runs in the AWS Lambda environment.  Of the 3 languages 
available for Lambda, I've chosen node.js for this project.

You can launch the application by hitting this url with your Chrome browser:  http://wavechallenge.s3-website-us-west-2.amazonaws.com/

# Points of Interest in This Implementation

## Background

I haven't written much in the way of front-end code since 2005, so I didn't put much focus there.  As you'll see from the UI,
my choice of colors, fonts, alignment, etc. is far from polished.  I recognize these shortcomings, but for a 3-hour project it
seemed more appropriate to focus on other aspects of the implementation.  For a commercial application with more complexity, 
I would expect a the use of Angular or a similar framework in addition to Bootstrap.  Ok, enough about the unrefined front end.

## Architecture

In the main directory of this project, please refer to file 'SeqDiag-01.png'.  In there you'll see a crude sequence diagram, which
lays out the design of this implementation.  Needless to say, there are numerous ways to solve this problem, and additional
requirements would likely dictate which solution is most appropriate.  But for now, I've chosen an architecture with these
primary attributes:

* Scales to millions of concurrent users without infrastructure or application modification
* Data storage available into the terrabytes without infrastructure or application modification
* Micro-service design
* Could (but currently does not) make use of AWS security services

### Scalability

The application, as it sits right now, can scale to millions of concurrent users with one simple change:  I’d need a credit card that could absorb the montly cpu and I/O charges. But no other changes would be required for the API layer or data storage.  The API layer is
implemented via AWS' API Gateway, and Lambda services.  As such, the API can scale to millions of requests per second on demand
without modification or the addition of servers or VM's.

Similarly, the raw file submitted by the application user (data_example.csv) is stored on AWS S3, which has no defined maximum capacity
since they add to it daily.  The database used by this implementation to store the data is DynamoDB, a document-based NOSQL
database.  It too scales to whatever size your credit card will support, so again, no inherent limits here.

### Micro-Service Design

Although this application is very small, it seems to break logically into two pieces:  1) The upload and storage of the data, and
2) the processing and summarization of the data.  Therefore, I have built two API functions, one for each.  However, it should
be noted that the upload and storage of a file is a generic type of operation that a company could use to support numerous applications
they may have needing this feature.  And since it scales without effort, there is little concern is allowing this microservice
to take on additional traffic.  This is a pretty good example of how a microservice can be built to support a wide range
of future needs.

A secondary aspect of the database implementation is the use of a UUID for the primary key in the DynamoDB database.  As 
recommended in the DynamoDB guidelines, a UUID primary key will behave appropriately for DynamoDB data-sharding mechanism.

## Shortcomings

There are many shortcomings in these implementation, which of course gives us great fodder for conversation.  But I'll list a
few here to get the ball rolling:

* Security - there is currently no security in this app
* UI - as mentioned previously, not ready for prime time.  And certainly, not WCAG-compliant!
* Configuration - there are numerous hard-coded values that should be moved to environment-specific configuration
storage, so they can take on different values for the development environment vs. the test environment, etc.
* Exception Handling - both front and back end code needs additional exception handling and testing

## Conclusion

Despite the numerous shortcomings, I hope that you find this style of solution interesting from the micro-service / scalability
perspective.  Please contact me if you have any troubles running the solution, or any other questions.  I can be reached
at warren_spencer_1977@yahoo.com.

