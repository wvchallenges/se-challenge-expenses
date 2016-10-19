# Wave Software Development Challenge
Applicants for the [Software developer](https://wave.bamboohr.co.uk/jobs/view.php?id=1) role at Wave must complete the following challenge, and submit a solution prior to the onsite interview.

The purpose of this exercise is to create something that we can work on together during the onsite. We do this so that you get a chance to collaborate with Wavers during the interview in a situation where you know something better than us (it's your code, after all!)

There isn't a hard deadline for this exercise; take as long as you need to complete it. However, in terms of total time spent actively working on the challenge, we ask that you not spend more than a few hours, as we value your time and are happy to leave things open to discussion in the onsite interview.

We prefer that you use either Ruby/Ruby on Rails or Python/Django; however, this is not a hard requirement. Please contact us if you'd like to use something else.

Send your submission to [dev.careers@waveapps.com](dev.careers@waveapps.com). Feel free to email [dev.careers@waveapps.com](dev.careers@waveapps.com) if you have any questions.

## Submission Instructions
1. Fork this project on github. You will need to create an account if you don't already have one.
1. Complete the project as described below within your fork.
1. Push all of your changes to your fork on github and submit a pull request.
1. You should also email [dev.careers@waveapps.com](dev.careers@waveapps.com) and your recruiter to let them know you have submitted a solution. Make sure to include your github username in your email (so we can match applicants with pull requests.)

## Alternate Submission Instructions (if you don't want to publicize completing the challenge)
1. Clone the repository.
1. Complete your project as described below within your local repository.
1. Email a patch file to [dev.careers@waveapps.com](dev.careers@waveapps.com)

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

Once you're done, please submit a paragraph or two in your `README` about what you are particularly proud of in your implementation, and why.

## Evaluation
Evaluation of your submission will be based on the following criteria.

1. Did your application fulfill the basic requirements?
1. Did you document the method for setting up and running your application?
1. Did you follow the instructions for submission?

# Submission
My submission for the Wave Software Development Challenge.

## System requirements and configuration
The submission uses NodeJS and MySQL, both are required installed before any installation steps below.

1. In the root folder, run - `npm install` to download all of the app's dependencies.
1. Open and edit the `\config\server.js` file to edit the NodeJS server details.  The default is: localhost:8000
1. Open and edit the `\config\database.js` file to edit the MySQL server details.  The default is: root:root@localhost:3306

## Running
After completing the configuration steps above, run the app using `node index.js`

## Editting
If any modifications are required, the app is structured in the following way:

1. `\components` - Client side ReactJS source files
1. `\config` - Server side configuration files
1. `\routes` - Server side route handling
1. `\static` - Client side static files (css, javascript, html, etc...)
1. `\uploads` - The location of uploaded files
1. `\index.js` - Entry point for server side NodeJS code
1. `\source.js` - Entry point for client side ReactJS code

If any client side ReactJS code is edited, it must be cross-compiled again by issuing `webpack` from the command line.  The output of `webpack` is stored in `static\js\index.js`

## Comments
Some items I'd like to point out with my submission relate to the ease of use for the end user.  Notably, a drag-and-drop interface for uploading files.  Invalid (i.e. non .csv) files are not allowed to be uploaded.  The target area will highlight green when an acceptable file is present.  After a file is uploaded, feedback is given to the user to indicate whether the upload and processing was successful.  If the file was not successfully uploaded (i.e. a csv with incompatible data) an error is given.

During processing the data is split up and saved in 4 tables (employee, tax, category, and expenses) without the end user needing to understand anything 'behind the scenes'.  The tables are created automatically on first run (or subsequent runs if the db has been deleted).  Currently, if presented with new 'employee', 'tax' or 'categories' in the uploaded file, records will be created in their corresponding table.  By splitting up the records into 4 tables, we could 'fix' the 3 support tables (employee, tax, category) to prevent junk data from being uploaded using a FK constraint.  It also allows provides a bit of future proofing should the need to add additional fields for the employee, tax or category records.

When the data has been uploaded and successfully processed, redirected automatically to the summary page (total expenses amount per-month).  A full page is also available should anyone need to view all data.
