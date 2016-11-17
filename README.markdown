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

### Instructions on how to build/run

This solution was developed and tested using Ubuntu 16.04. It requires Python 2.7, although this should be built into the OS, check by running 'python' at the command line. The solution uses sqlite3 for database creation/interaction. This is already available with Python, so it shouldn't require further installation.

The only external library it uses is web.py for the web interface. This can be acquired using pip (which may also need to be installed). The following command line instructions should work:

sudo apt install python-pip
sudo pip install web.py

The solution uses only one file, upload.py, which can be found in directory /bin. To start the solution, simply run the following via command line from the main project directory:

python bin/upload.py

The HTTP server will then wait for user interaction. To connect, simply open a browser (the solution was tested using Firefox 49.0.2, for example) and browse to http://localhost:8080/upload

This will present the user interface. To upload a file, click the browse button and choose the appropriate, .csv formatted file (data_example.csv was used for testing). Then click submit and the total expenses per month will appear in a table below the input. If no file is selected, or an invalid format is used, an error message will be presented instead. To stop the HTTP server, type CTRL-C at the command line.

### Why I am proud of this implementation

This is a straightforward solution, that uses minimal resources. It is easy to set up, and only required one external, open-source library (web.py). It is easily customizable for style of the interface. It is robust, from what I have tested, and quickly displays the output with a minimum amount of clicks.

Here is a summary of what was used:

Python 2.7 - A simple yet powerful language, it's used here for processing and parsing.
sqlite3 - Built into Python for ease of use, this allowed a straightforward way to implement the database, which could be lightweight given the data.
web.py - An open-source library used to add web functionality to Python, this provided a straightforward way to set up a lightweight server, sufficient for the problem.
HTML - Used to generate the web form and output table, this was easy to generate using Python.
CSS - Built into the style tags of the HTML, this allowed for modification of the form and table, and provides a simple way to alter based on preferences.

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
