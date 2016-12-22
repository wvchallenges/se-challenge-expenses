# Setup

### Prerequisites

  1. Python 2.7
  2. Virtualenv

### Run the demo

  0. clone the repository and cd into it
  1. `virtualenv expenses`
  2. `source expenses/bin/activate`
  3. `pip install -r requirements.txt`
  4. `python setup.py`
  5. `python run.py`
  6. from another terminal window run
    * `source expenses/bin/activate`
    * `python client/expenses.py --upload ./data_examples.csv` to upload and view a summary of the expenses
    * `python client/expenses.py` to only view the summary

### Comments

The project **lacks a web interface**, and needs to be interacted with through the terminal. I apologize for the incompleteness and lack of tests, but please do note that this solution was build 1/3 on a plane, 1/3 in a car and 1/3 in a room full of christmas guests.

What I'm particularily proud of in my implementation: when I started working on this, I had grand ideas, which sadly didn't materialize. Now, although my pride is being overshadowed by a sense of forfeit, I can say that I'm satisfied with the derived database schema, which allows, in combination with a nice ORM, to generate complex queries while maintaining a decent level of extensibility. This might sound silly but I'm also satisfied with the folder structure for the project and the concerns separation into files, as it's intuitive and clean.

### Implementation notes

    1. **Models**: under the `models` folder you will find some Alchemy models representing the data in the csv in such a way to be easily extended in the future. In particular note that `categories`, `employees` and `taxes` have their own table.

    2. **Seeding / Uploading**: the .csv is lacking unique ids, thus when creating records for categories, employees and taxes, I had to assume the uniqueness of some of its data, which isn't necessarily true.

    3. **Testing**: Initially I wanted to use `pytest` to do some basic testing on the csv parsing and model generation results, and the server response, but I did not have enough time available.

    4. **Templates**: I started building a web interface, but ultimately resorted to a vintage terminal-based solution due to the little time available, but I hear that's all the rage anyway.


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
