# Wave Software Development Challenge
Applicants for the [Software Developer](https://www.waveapps.com/about-us/jobs/software-developer/) career at Wave must complete the following challenge, and submit a solution prior to the interviewing process. This will help the interviewers assess your strengths, and frame the conversation through the interview process. Take as much time as you need, however we ask that you not spend more than a few hours. 

We prefer that you use either Ruby/Ruby on Rails or Python/Django; however, this is not a hard requirement. Please contact us if you'd like to use something else.

Send your submission to [dev.careers@waveapps.com](dev.careers@waveapps.com). Feel free to email [dev.careers@waveapps.com](dev.careers@waveapps.com) if you have any questions.

## Submission Instructions
1. Fork this project on github. You will need to create an account if you don't already have one
1. Complete the project as described below within your fork
1. Push all of your changes to your fork on github and submit a pull request. 
1. You should also email [dev.careers@waveapps.com](dev.careers@waveapps.com) and your recruiter to let them know you have submitted a solution. Make sure to include your github username in your email (so we can match applicants with pull requests).

## Alternate Submission Instructions (if you don't want to publicize completing the challenge)
1. Clone the repository
1. Complete your project as described below within your local repository
1. Email a patch file to [dev.careers@waveapps.com](dev.careers@waveapps.com)

## Project Description
Imagine that Wave has just acquired a new company. Unfortunately, the company has never stored their data in a database, and instead uses a comma separated text file. We need to create a way for the new subsidiary to import their data into a database. Your task is to create a web interface that accepts file uploads, and then stores them in a relational database.

### What your web-based application must do:

1. Your app must accept (via a form) a comma separated file with the following columns: date, category, employee name, employee address, expense description, pre-tax amount, tax name, and tax amount.
1. You can make the following assumptions
 1. Columns will always be in that order
 2. There will always be data in each column
 3. There will always be a header line

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

## Running the solution

I have uploaded a script to automatically install and run the application: install.sh, available in the root repository.

1. Copy paste install.sh onto your computer, where you would like to install the application
2. Open up a terminal and run: 
   `bash -x script_name.sh`
3. The following message should appear, meaning the installation was successful:

```Starting development server at http://127.0.0.1:8000/```
```Quit the server with CONTROL-C.```

4. Open your browser to http://127.0.0.1:8000/

 
## Implementation

#### Upload 
Users have the possibility to either use a file browser, or simply drag and drop files onto the upload page in order to select the files to upload. I enabled both methods for the user's convenience.

As an additional feature, I also enabled the submittion of multiple files at once. I think that if this application was to be used in a real situation, it is quite likely that one would have to process several files, and submitting them one by one would be quite annoying.

The application also checks on the client side that the files submitted are CSV files, and alerts the user if it's not so.

#### Output
I went for a minimalist, easy to read output. In addition to displaying the total amount of expenses for each month, I also chose to compute and display each year's total as I thought this could be useful information as well.

An error message is displayed alongside the table if one or more entries contained in the files already exist in the database. Moreover, an error message is also displayed if file parsing failed (in which case no table is displayed).

#### Backend
The application has only one view which handles requests to the application's root URL.

Upon a GET request, it returns upload.html which is a form for submitting files to the server.

Once the form is submitted with a POST request, the view parses the files, adds the entries to the database, computes the total expenses for each month and returns this data in summary.html, the output file which consists of a table displaying this information.

The total amount spent for each month is computed with the use of an in-memory table, that is updated every time we process a new database entry. Keeping it in memory is faster than using SQL select queries. This variable however is reset for every new upload (new POST request).

#### Conclusion 
I am proud of my application because of its user-oriented design. I think that features such as file selection using drag and drop, and multiple file upload make the app much more convenient.

Another example of careful design is to check for duplicates, which seemed important to me because in a real-life sitation, users make mistakes and one could easily end up uploading the same file twice. However, it is important that such errors do not propagate to the database.

In terms of the backend, I tried my best to structure the application in a way that makes it very readable and easier to troubleshoot. Each function has a clear and limited objective, which helps for both readability and troubleshooting.




