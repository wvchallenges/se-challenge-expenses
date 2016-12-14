# Setup

NOTE: The following instructions have been tested against an Ubuntu 16.04 LTS system, but should work on any *nix
system that satisfies the following,

### Requirements

* Python 3.5  (instructions were tested against Python 3.5.2)
* Virtualenv  (should come along with Python 3)
* An internet connection

Before proceeding, please clone this repository on your local system.

Using a terminal window (shell), pease navigate to the directory the repository has been cloned into. We will assume that this is called ``PROJECT``

```
$ cd PROJECT
```

We will now need to create a new virtualenv for development as well as install dependencies. Run the following
commands,

```
$ virtualenv --python=python3 VENV
$ source VENV/bin/activate
(VENV)$ pip install django==1.8.17
```

We have selected Django 1.8 because it is the most recent LTS release. 

Please move into the ``mysite`` project folder and run migrations to create a sqlite database with the following
instructions,

```
(VENV)$ cd mysite/
(VENV)$ python manage.py migrate
```

It will be useful to create an admin account right now, to be able to see the uploaded data. Please run the following,

```
(VENV)$ echo "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'myemail@example.com', 'admin')" | python manage.py shell
```
(ref: http://stackoverflow.com/a/24068570/198660 )

You can now run the website locally by executing the following,

```
(VENV) $ python manage.py runserver
```

To see the main page, please visit http://127.0.0.1:8000/ with your web-browser.

To access the admin page, please visit http://127.0.0.1:8000/admin on your browser. Use credentials ``admin/admin`` which we created earlier to login.

## Screenshots

After a CSV file has been successfully uploaded, your browser should look similar to the following image,

![After upload](upload_example.png?raw=true "After upload")

If you login to the admin page, you should be able to see the stored data as follows,

![Stored data](admin_view.png?raw=true "Stored data")


## Assumptions made

* User will ONLY upload valid CSV files; error checking is minimal in current implementation


## Solution highlights

* Good Documentation

This author likes to think that he writes good technical documentation about the projects he works on. :) 

* Uploaded Expense Report

After a file has been uploaded, an objective was to show total expenses by month. The totals shown in this solution include tax, as this reflects the actual cost incurred by a firm and is more useful to make financial decisions against. 

The expense report is rendered using Bootstrap Data tables (ref: https://datatables.net/ ). This was used to make it easier for an end-user to sort the information in either chronological order or to quickly determine what months were most expensive. 

* Report Pie chart

It is felt that a pie chart representation would be effective for a user to understand what months are more expensive than others. Many books on User Experience write that a visual cue is easier to understand than text data in a table (refer screenshot above).

* Created/Modified information for uploaded data

It IS possible that data in the CSV files might be out-dated or in need of minor corrections. For now, the only way to make these kind of corrections, is via the admin interface. To keep track of when a record might be changed, the created (basically the uploaded date) and modified time-stamps are stored in the database (refer screenshot above). Also ref: https://github.com/abrahamvarricatt/se-challenge-expenses/blob/master/mysite/csvupload/models.py

* Use of Decimal data-type

In the django solution, Decimal data-type has been used to store financial information as opposed to float. This is to avoid any rounding errors that might occour when using float. (ref: https://docs.python.org/3.5/library/decimal.html )

* Business logic in views.py

The calculation of month total expenses is done in the views.py source file during file processing. This is felt to be a better location to perform this calculation, instead of say, the template file. (ref : https://github.com/abrahamvarricatt/se-challenge-expenses/blob/master/mysite/csvupload/views.py#L49-L54 )

* Storing uploaded CSV files on server

If an end-user uploads a file larger than 2.5MB, Django will not be able to process it in-memory (at least, during the upload). Thus, we first store the uploaded file to disk on server and only after that, attempt to parse it. (ref: https://github.com/abrahamvarricatt/se-challenge-expenses/blob/master/mysite/csvupload/views.py#L21-L27 )



---
---
---



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
