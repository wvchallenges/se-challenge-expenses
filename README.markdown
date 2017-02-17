# Basil's Wave Software Development Challenge

## Project Development Environment Setup

### Instructions for setting up on Mac OS X:
(optional) Feel free to set up a virtual env for the development setup

- Install Python, pip and Django 1.10.2
```
brew install python

sudo easy_install pip

sudo pip install Django

```
- Clone Repository
```
git clone git@github.com:basilkhan05/se-challenge-expenses.git
```
- Run Database Migrations
```
cd se-challenge-expenses

python manage.py migrate
```
- Run Development Sever
```
python manage.py runserver
```
- Checkout the application in action at http://localhost:8000/


## Application Architecture

The CSV upload and parser application was built in Django 1.10.2 with a sqlite3 database. Django's Model-View-Template (MVT) framework makes the application modular with separation of concerns. This applies not only to the UI and template of the application, but also to the Models and Views that were generated for the csv files uploaded and for the expense summaries.

This Modular design can help in the integration of this application/feature into a larger application or Wave's production app. Separating the helper functions and using packages such as csv.DictReader can also help modify the helper functions to parse any other csv format with different header titles that can be defined or chosen by the user via an Admin UI. 

The html templates were further split into larger components (header, navbar, sidebar, etc.) that can assist a front-end engineer to integrate a component or parts of a component into an existing front-end framework like React or Angular. Furthermore, when deploying this application, the static files, which are further split into their own folder, can be served over a CDN or an AWS S3 buckets in production.

The choice of a light weight relational database (sqlite3) was made to help in quick development setup time as well as the ability to use powerful SQL queries to extract and summarize expense information and other queries as the need arises. 

### Future feature considerations (not an exhaustive list):
- File type validation
- CSV Field Type Validation (for dates and amounts)
- 'Parsing Status' flag in the database to let the user know that the file is still being processed/parsed (for very large file sizes)
- Better memory handling when parsing very large file sizes
- Limit on File Upload Size
- Upload feature implemented as an API to get response from the server on upload and parsing status
- Implementation of UI elements for the above

-----------------------------------
# original README FILE:

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
