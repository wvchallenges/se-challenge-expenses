# Wave Software Development Challenge
Applicants for the [Software developer](https://wave.bamboohr.co.uk/jobs/view.php?id=1) role at Wave must complete the following challenge, and submit a solution prior to the onsite interview.

The purpose of this exercise is to create something that we can work on together during the onsite. We do this so that you get a chance to collaborate with Wavers during the interview in a situation where you know something better than us (it's your code, after all!)

There isn't a hard deadline for this exercise; take as long as you need to complete it. However, in terms of total time spent actively working on the challenge, we ask that you not spend more than a few hours, as we value your time and are happy to leave things open to discussion in the onsite interview.

Please use whatever programming language and framework you feel the most comfortable with.

Feel free to email [dev.careers@waveapps.com](dev.careers@waveapps.com) if you have any questions.

## Project Description
Imagine that Wave has just acquired a new company. Unfortunately, the company has never stored their data in a database, and instead uses a comma separated text file. We need to create a way for the new subsidiary to import their data into a database. Your task is to create a web interface that accepts file uploads, and then stores them in a relational database.

## Development Goals
My solution is a very simple bone stock Django deployment running on Python 3.5.2. I stuck to only using python built-ins and Django to get everything done. I wanted to focus on making a simple, readable, maintainable codebase with a proper test suite to show that I can write production ready code that above all is easy to understand and maintain. I also wanted to design the front-end of the code to be as friction-free as possible, while emulating the design of the wave website.

I think I achieved my goal of making the code simple, readable, and maintainable. There are only 2 models; one for the expenses and one for the expense reports. The expense model has a many-to-one field relating to the expense report model. This allows us to easily access any expense report and get the breakdown of expenses by month. I decided to write the view code using function based views since I wasn't entirely familiar with with class based views yet and I didn't think this was the right time to experiment. Learning class based views is on my todo list :).

I didn't have to the think too out-of-the-box to decide on the datatypes for the expenses since they readily mapped out to standard Django Model Fields. The only real decision that I had to make was between float and decimal for the tax and pretax amounts. I went with decimal fields to avoid and rounding errors that might come up with float math.

The best design decision I think I made was to use csv.DictReader to read the csv files rather than doing it raw in some other way. It allowed me to very easily construct my expense objects in one statement. I didn't really have to separate concerns in this challenge more or less than in any other app. Django's API design naturally guides you to separating concerns (models, urls, views, apps, etc.). This app was very simple though so I didn't feel it was necessary to.

I'm really interested in front-end design and programming so I wanted to make the upload page as clean as possible. I wanted to implement a drag and drop interface but scratched it because I thought it would take too much time. I settled for having the form auto-upload whenever you select your file. A small but I think significant difference if you'd be uploading many files.

## How-to-Build
1. Create an isolate 3.5.2 python virtual environment. You can use virtualenvs or pyenv but I would recommend against running this app globally.
1. Activate the virtual environment
1. Create a folder to serve as the root.
1. Clone the [repo](https://github.com/guptamo/se-challenge.git) into your root folder.
1. Install the required packages using pip install -r requirements.txt from the root folder.
1. cd into the src folder.
1. Run migrations on the database using ./manage.py migrate
1. Run the dev server using ./manage.py runserver
1. Navigate your browser to the [server url](http://127.0.0.1:8000) 

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
