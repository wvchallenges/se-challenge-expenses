# Instructions
1. Application consists of 2 parts: Server and Client.
    - Server handles all APIs for the client and uses SpringBoot 1.4 with Grails and PostgreSQL 9.6.2 as a datasource.
    - Client is written in HTML5, CSS3 and AngularJS 1.5.
    - There are folders for parts, below are instructions how to run them.

### Requirements for Client App -> [client](client)

* [Node.js](http://nodejs.org/)

### Development Quick Start

1. Open command line and install bower and grunt-cli in global dependency
    $ npm install -g bower
    $ npm install -g grunt-cli

2. Go to the root folder of this project on command line
    $ cd /PROJECT-ROOT/client

3. Install dependency files
    $ npm install

4. Create a config file from environment.properties
    $ grunt envconfig:./environment.properties

5. Execute (default browser will open)
    $ npm start

### Test

Check syntax error

    $ npm test


### Deployment

1. Install & update dependency files
    $ npm install
    $ npm update

2. Create a config file from environment.properties
    $ grunt envconfig:{path}/environment.properties

3. Build
	$ grunt build
***

### Requirements for Server App -> [server](server)
* IntelliJ IDEA
* Java 8 or above + Gradle
    - ```brew install gradle 2.14```
* PostgreSQL 9.6.2
    - ```brew install postgresql```
    - db setup queries are in [resource/db](server/src/main/resource/db/)

### Quick Local Start (IntelliJ)
1. Open project file (File > Open)
2. Select the project file
3. Check "User default gradle wrapper"
4. Update application.yml.template with custom properties

### Quick Local Start (command line)
1. modify application.yml with custom properties if needed
    * aws accessKey and secretKey is required for the file uploads to s3 (optional. to make it work provide AWS credentials and create a bucket in S3)
    * database name(important),host,port,user,schema required
2. ```postgres -D /usr/local/var/postgres``` (the db name will be the current username later -> {database_name})
3. ```psql -f src/main/resources/db/setup.sql {database_name}```
3. ```gradle build```
4. ```nohup java -jar build/libs/uploader-0.0.1.jar &``` (or just: ```java -jar build/libs/uploader-0.0.1.jar```)

### How To Fix Error (optional in IntelliJ only)

Project Language Level Error:

Open Project Structure window (File > Project Structure), and set to "8 - Lambdas, type annotation etc." on Project language level.

***
## Some Description of implementation
I separated the whole project into 2 sides: front-end and back-end. That way its easy to manage/maintain the application and back-end can become and API for some other applications in the future.
 - From back-end view (SpringBoot + Grails): I added 2 tables to handle the required tasks: job and employee_data (the data from file). That gives application more strengths, particularly that user can upload additional files if he/she wants to. Application can be extended easily to save every file into specific table etc. Also, I added optional feature that stores the file into AWS S3 every time the request succeeds, this feature will work only if developer provides AWS credentials. This will create backup files in case of something, or if they need to be reused in the future by some other app etc. The report data is parsed into json objects right away in sql query and returned back to front-end to be easily rendered.

 - From front-end view (AngularJS + Grunt + Bower): Front-end is an AngularJS project with extensive grunt tasks for the easily development, tests and deployment. There are only 2 pages present:
    1. upload page: where user can upload files and see all the jobs with required reports by clicking on the specific row.
    2. 404 page for all other routes.

 To make application really maintainable and easy to extend, I added grunt task that parses environment.properties file with all required configs. Also, application has all kinds of syntax checks (js,html), concatinating all js files into 1. During the deployment it copies all the required files into dist location. I also use LESS for styles, cause it has more in it, but during the deployment its compiled into css. Application also has livereload, so that developer shouldn't restart the app every time something changes.

This is it I guess,
Cheers!
***

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
