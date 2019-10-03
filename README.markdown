# Wave Full-stack Development Challenge
Applicants for the Full-stack developer role at Wave must complete the following challenge, and submit a solution prior to the onsite interview. 

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


------- Commnents from LIN -----------
First of all, I wish to thank all people who had spent time on this code challenge. This is the best interview that I have had by now.

I was using thinkphp in past 3 years, and actually, I implemented a very similar functionality in previous project, in which doctor import/export their time schedule from excel file. I know people in Wave are using python/Django, so I spent some time to warn up with python/Django and then start this project. Well, this could be a bad decision since it took me longer time to submit the code. However, this could also be a great decision since I realize the beauty of python/Django, and feeling love with it. 

While I am using php, one of the hardest question is how to separate front-end with backend. Javascript based technologies, such as React and Angula JS, is pushing more power on front-end, which blur the margin between frontend and backend. Django provides strong emphasize on backend, such as controlling html flow in view and model, and this makes it easier for expertise to work together on both side, especially great for AI and dating mining support on backend. 
System and App Version:
	Ubuntu 16.04.4 LTS
 	Python Version: 2.7.12
 	Django Version 1.11
 	MySQL: 5.7.2
 	IDE: VIM 

How to Start the App:
we need to create a database in MySQL (I would recommend phpmyadmin for MySQL), and then setup DB configurations at setings.py
vwchallenge$ vim vwchallenge/settings.py
	update DB username and password:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': {THE DB NAME WE CREATE BEFORE},
            'USER': {YOUR DB USERNAME},
            'PASSWORD': {YOUR DB PASSWORD},
            'PORT': '',
        }
    }

Initial the data, and start the server
    ../vwchallenge$ python manay.py makemigrations
    ../vwchallenge$ python manay.py migrate
    ../vwchallenge$ python manay.py runserver 

The App should be up at: 172.0.0.1:8000

The system uses default 8080 port, however, you can always specify your port number after runserver command.

For App implementation, I process the CSV file in memory, and write the data to DB after proper validations. Then, I query expense records from DB, calculate the monthly cost, and populate the data to template.The App will refuse to process csv file if it believes the file is too large. 

I use "file_tag" (a python generated uuid) to identify an uploaded csv file, and keep other model entities safe and open --- only define basic type validation and make them open to receive data. By this design, we could provide a friendly App and continuously provide valuable restrictions based on client's feedback. Over limited form validation might make the App hard to use, and use Product Owner's feedback to define validation could make dev flow much more efficient.

Logs, one of the most beautiful gifts from python, should be fully used in the App. The logging configuration is defined in settings.py. I created a LOG directory under project root for testing purpose. However, in production deployment, it should be place in non-www directory and be grant with www-data permission. Meanwhile, we could use Celery to monitor the loging directory. Log files are easily eating out storage space.

What to do Next: 
Is the App ready for production? No…there are couple of enhancement we could do to make it better:
1.	There some cases, such as handling address format, could be implement in more pythonic way, which will make code easier to understand and simple to maintain.
2.	The App process csv file directly, without checking if it is a duplicated file or not. We could implement a separate module to check file redundancy, and inform user the duplicated file before he/she wish to submit. This will save a lot time/resource in writing data to DB as well. 
3.	Make the App a widget. Instead of present the App as a standalone App, we could make the App as a widget, which could be easily imported in other projects.
4.	Instead of processing csv file in memory, we could save the CSV file in disc, and process its data there. This would help to remove the file size limitations, and meanwhile, help to keep file backup for customer.
5.	There are many great python libs in handling csv file, such as Panda, Django-import-export, etc. These libs covers many corner cases with regarding to data type and validation, and provide supportings in EXCEL and many other file format. It might be a better approach to integrate these libs in production code.   




 





