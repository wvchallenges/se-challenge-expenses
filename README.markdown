# Wave Software Development Challenge
Applicants for the [Software Developer](https://www.waveapps.com/about-us/jobs/software-developer/) career at Wave must complete the following challenge, and submit a solution prior to the interviewing process. This will help the interviewers assess your strengths, and frame the conversation through the interview process. Take as much time as you need, however we ask that you not spend more than a few hours. To complete this exercise, please use either Ruby/Ruby on Rails or Python/Django.

Please send your submission to [dev.careers@waveapps.com](dev.careers@waveapps.com). Feel free to email [dev.careers@waveapps.com](dev.careers@waveapps.com) if you have any questions.

## Submission Instructions
1. Fork this project on github. You will need to create an account if you don't already have one
1. Complete the project as described below within your fork
1. Push all of your changes to your fork on github and submit a pull request. You should also email [dev.careers@waveapps.com](dev.careers@waveapps.com) and your recruiter to let them know you have submitted a solution. Make sure to include your github username in your email (so we can match applicants with pull requests).

## Alternate Submission Instructions (if you don't want to publicize completing the challenge)
1. Clone the repository
1. Complete your project as described below within your local repository
1. Email a patch file to [dev.careers@waveapps.com](dev.careers@waveapps.com)

## Project Description
Imagine that Wave has just acquired a new company. Unfortunately, the company has never stored their data in a database, and instead uses a comma separated text file. We need to create a way for the new subsidiary to import their data into a database. Your task is to create a web interface that accepts file uploads, and then stores them in a relational database.

### What your web-based application must do:

1. Your app must accept (via a form) a comma separated file with the following columns: date, category, employee name, employee address, expense description, pre-tax amount, tax name, and tax amount.
2. You can make the following assumptions
 1. Columns will always be in that order
 2. There will always be data in each column
 3. There will always be a header line

 An example input file named data_example.csv is included in this repo.

1. Your app must parse the given file, and store the information in a relational database.
1. After upload, your application should display a table of the total expenses amount per-month represented by the uploaded file.

Your application will get bonus points if it completes the following:

1. Handles authentication or authorization via OpenID/OAuth
2. Is aesthetically pleasing
3. Present any part of the data in chart form

Your application should be easy to set up, and should run on either Linux or Mac OS X. It should not require any non open-source software.

## Evaluation
Evaluation of your submission will be based on the following criteria. Additionally, reviewers will assess your familiarity with standard libraries. Reviewers will also assess your experience with object-oriented programming and data modeling based on how you've structured your submission.

1. Did your application fulfill the basic requirements?
1. Did you document the method for setting up and running your application?
1. Did you follow the instructions for submission?
