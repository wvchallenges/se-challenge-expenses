# Wave Software Development Challenge
## Project Description
Imagine that Wave has just acquired a new company. Unfortunately, the company has never stored their data in a database, and instead uses a comma separated text file. We need to create a way for the new subsidiary to import their data into a database. Your task is to create a web interface that accepts file uploads, and then stores them in a relational database.

### Documentation:

1. Instructions on how to build/run your application
  1. Install packages:
  '''
  npm install
  '''
  2. Setup local mysql database:
  '''
  mysql -u -root -p
  '''
  Then change connection password in /modules/db-bridge.js to root password
1. A paragraph or two about what you are particularly proud of in your implementation, and why.
  This project is built with the technologies I'm most familiar with: Nodejs + Angularjs. In summary, I took the express app framework, and integrated Angularjs components. I try to keep the overall design simple and clean, with different components separated for easy maintenance.

  For front-end, I implemented a simple MVC pattern using Angularjs. I created a single controller for the home page of the web app, which uses its service to handle http requests for file uploading and data fetching. In addition, routing is done using the flexible ui-router package.

  For back-end, requests are handled by the nodejs server. I also created a custom node module for database operations and csv parsing. Async package is used to handle asynchronous query calls to the database, making sure responses are sent at right times. CSV file is also parsed here to have the appropriate datatypes stored in the database.

  For database, I used a local instance of mysql as a proof-of-concept. For demonstration purpose only, the connection credentials are kept in clear text in the project. If a production database instance were used, I would use habitat to store credentials in environment variables.

  Overall I'm quite happy with this implementation, and I look forward to discuss it further will you!

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
