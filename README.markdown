
## Installation instructions

I hope you know how to complete the first two steps.

1. Install Ruby on Rails 5 and Ruby 2.2.2.
2. Install Sqlite3.
3. Clone my fork of the repo: 'git clone git@github.com:adriaanlabusc/se-challenge.git'.
4. cd into the data-importer direcotry
5. Run 'bundle install'
6. Run 'rake db:migrate'
7. Run 'rails server'
8. Navigate your browser to 'http://0.0.0.0:3000/admin/login'
9. Login using the username: admin@example.com and the password: password
10.  You can now upload a CSV file on the Csv Files tab.


## Features/Thought process

I completed the task using Ruby on Rails and the ActiveAdmin administration framework. I chose to use ActiveAdmin as it allowed me to deliver a somewhat complete application in a short period of time.

Some assumptions I made:

 * You will want to upload multiple files. To accomodate this I keep track of the file an expense came from so that:
	*	You can delete all expenseses associated with a file (in case you uploaded the wrong file)
	* You can see a monthly summary of expenses for each file. This would not be possible if expenses from files and manually entered expenses were mixed. 	
* Employees will want to enter future expenses directly into the application. This is implemented to some extent (not thoroughly tested) and us mostly provided for free by ActiveAdmin

I split the CSV file into a number of models/tables so that the database is mostly normalized. This is good practice unless there are performance reasons for de-normalizing the database. The modles are:

* Categories: This will allow employees to select from a list of categories, rather than making them up every time.
* Employees
* Expenses
* Taxes: This is currently just a tax name. In a more complete solution you might want to let a user select CA Sales Tax and then calculate the amount and store it in the expenses table. I'm sure taxes change frequently (if you have employees all over the world) so automatically keeping your application upto date  with the latest taxes would be useful.













The original instructions
-----


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



