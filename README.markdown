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


### Answers
## Build/Deploy Instructions:
1. Install virtualenv: http://docs.python-guide.org/en/latest/dev/virtualenvs/
pip install virtualenv
virtualenv -p /usr/bin/python2.7 venv
source venv/bin/activate

2. Install Python packages
pip install -r requirements.txt

3. Install Homebrew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

4. Install MySQL
brew install mysql

5. Start MySQL Server
mysql.server start

6. Run Migrations
mysql -u root -p < migrations/migration_001.sql

7. Run application
python main.py

8. Visit the webpage
http://localhost:8080/expense-upload


## Praising the Implementation
I am proud in this implementation because of the clean separations between the different components. The different components consist of a complete different app (expense_app) from the main app. The developer has the ability to add more functionality within the app, completely replace it or delete it with a change of a single line. The expense_app is pretty clean as well.


## What design decisions did you make when designing your models/entities? Why (i.e. were they explained?)
There was a consideration of data normalization the Expense Entity. We have the ability to separate the employee information into a User table and UserRoles table. The User table would have normal attributes data such as name and address and the UserRoles table will handle to see if the user is an employee and different roles. We can do the same for tax information. For the sake of just "store the information in a relational database", I decided to just store it within a single table and not overcomplicate the app.


## Did you separate any concerns in your application? Why or why not?
One of my biggest worries was that the reviewer would not be able to read the code easily. I have decided to divide the application as much as possible to make it as clean and readable as possible.


