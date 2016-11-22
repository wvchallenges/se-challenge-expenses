# Table of Contents
1. ###### Wave Software Development Challenge
2. ###### How To Run This Project ?
3. ###### Am I Proud Of My Implementation ? 

# 1. Wave Software Development Challenge
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

# How To Run This Project ?

1-Setting a [virtual environment](https://virtualenv.pypa.io/en/stable/):
```
$ mkdir venv
$ virtualenv venv
$ source venv/bin/activate
```
2-Cloning the project
```
cd venv
git clone https://github.com/addonis1990/se-challenge.git
cd se-challenge
```
3-Installing dependencies:
```
pip install -r requirements.txt
```
4-Performing migration
```     
python manage.py migrate
```

5-Running the project:
```     
python manage.py runserver
```

6- Go to your browser and open this link: `http://127.0.0.1:8000/`


# Am I Proud Of My Implementation ?
Definitely, I take pride in every bit of code I write. Truth should be said, this was not a complex project that required  a set of delicate decisions, complex designs and several tradeoffs to build. However, it was interesting to learn how to deal with csv files using Python language and the Django Framework. When it comes to database, I believe the way I designed my models/tables is very natural and straightforward. I created 2 models (Employee, Category) that are both pointing  to a third model (Expense) via a one to many relationship. There should be no confusion understanding them and figuring out the relationships that tie them. Also, I embraced the way Django structures projects.  My project is clearly structured in three main parts:
* ‘wavechallenge’ directory: This is where we can tune the project on a high level. This directory includes mainly the webapp settings and the url settings. 
* ’db’ directory: where data is being stored in a sqlite database
* ‘expensemanager’ directory: this where all the magic happens. This directory represents the django app that will handle the csv file and returns the required results.

The latter directory includes also a few lines of codes that I really had fun writing them. One thing that I wanted to do in this project is to show the expenses-per-month table in a chronological order and display months in this format: \[month in letters\] \[Year\] (Example: November 2016). The input csv file is more likely to be unsorted and the date format is very basic (digits separated by slashes)  and thus I had to find a solution that would incorporate simplicity with efficiency to display the desired order. In order to solve this problem, I used python dictionaries eventhough they are intrinsically an unordered data structure and tweaked them to get the sorted list.