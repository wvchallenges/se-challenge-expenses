# Wave Software Development Challenge

#Build Instructions for this submission

The system is The system is seperated into 2 projects, a scalable backend REST service and a front end Angular 1 application.

Setting up the REST services:

System is currently tested for: PHP 5.6.27, and mysql  Ver 14.14 Distrib 5.6.27.
It is tested without Apache using php command line server running the command 

php -S 0.0.0.0:4444

1) Clone the repo into any desired test space.

2) In the main folder create 2 new folders called logs and uploads. Give these 2 folders read and write permissions.

3) run composer (https://getcomposer.org/) by using command `php composer install` to set up dependency vendor folder as well as autoload file.

4) set up SQL database by running the included sql/schema.sql file in local copy of mysql.

5) open class/Settings.class.php file, and modify to accomodate environment variables.

6) run command `php -S 0.0.0.0:4444` in terminal to start the server
 
 #optional set up instructions

 7) included in folder postman is 2 export files that can be imported into postman to access the services without the use of the app. import these JSON files into postman. 

 8) go to manage environment (Gear icon in the top right corner), select the correct environment (TracyMAC wave) and change the siteUrl variable to be compatible with your exiting environment. Close Management tool.

 9) make sure you are using the correct environment in dropdown. you should see 3 services. The status service should tell you if the environment is set up correctly.

 Setting up the App:

 1) Use file open, and navigate to app/index.html file in any browser (tested in Chrome). into 2 projects, a scalable backend REST service and a front end Angular 1 application.

Setting up the REST services:

System is currently tested for: PHP 5.6.27, and mysql  Ver 14.14 Distrib 5.6.27.
It is tested without Apache using php command line server running the command 

php -S 0.0.0.0:4444

1) Clone the repo into any desired test space.

2) In the main folder create 2 new folders called logs and uploads. Give these 2 folders read and write permissions.

3) run composer (https://getcomposer.org/) by using command `php composer install` to set up dependency vendor folder as well as autoload file.

4) set up SQL database by running the included sql/schema.sql file in local copy of mysql.

5) open class/Settings.class.php file, and modify to accomodate environment variables.

6) run command `php -S 0.0.0.0:4444` in terminal to start the server
 
 #optional set up instructions

 7) included in folder postman is 2 export files that can be imported into postman to access the services without the use of the app. import these JSON files into postman. 

 8) go to manage environment (Gear icon in the top right corner), select the correct environment (TracyMAC wave) and change the siteUrl variable to be compatible with your exiting environment. Close Management tool.

 9) make sure you are using the correct environment in dropdown. you should see 3 services. The status service should tell you if the environment is set up correctly.

 Setting up the App:

 1) Use file open, and navigate to app/index.html file in any browser (tested in Chrome).

#Notes on permissions

This system needs to be running locally, as I did not deal with CORS. If you run the back on on a public system and the app locally you will hit cors errors. The system can handle them, but setting them up and testing was not in the scope of this code challenge. Also, permissions on uploads and logs folders should be set to that the user running php has read and write permissions.

I am much more of a back end person that a front end person, although I am competant in both. I like this design because in a total separation of functionality, scalability is much easier. I went out of my way to follow the instructions, and so this specific app will only show the latest file that was uploaded, and not all of the aggregated data. Should that become a requirement in the future (as usually is the case with clients) this is easily created by adding a new service and a new query. I have also made sure that the system will allow a Version2 of the code for future updates.

This system does hande its own logging, and each new file uploaded is saved for future use. A timestamp has been added to the file to keep multiple copies of the same named file. Each employee is only ever added once, and the system is checking to make sure if the same accounting entry per day is unique. Uploading the sane file over and over will not add new items to the database.

I would like recomend some alterations to the functionality (for future consideration). The first is that you should be able to add an alteration or deletion to an entry. this can easily be added by not ignoring the duplicate entries.  The second is to add an aggregation screen to see entire years worth of accounting based on all uploaded files.

#Original README content

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
