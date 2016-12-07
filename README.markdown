# Solution to the Wave Software Development Challenge

## Building and Running the App

Below are the instructions for building and running my solution to the Wave Software Developement Challenge.

### Dependencies

This is a solution using Python, the Django web framework, and a PostgreSQL database. All of these technologies are free (as in beer and as in freedom) and open-sourced.

My implementation was run using the following versions:
    

| Software                                 | Version |
|------------------------------------------|--------:|
| [Python](https://www.python.org)         | 2.7.11  | 
| [Django](https://www.djangoproject.com/) | 1.10.3  |
| [PostgrSQL](https://www.postgresql.org/) | 9.6.1   |

And the application was developed and tested in:

| Software | Version               |
|----------|----------------------:|
| Mac OS X | 10.11.6               |
| Chrome   | 54.0.2840.98 (64-bit) |
| Safari   | 9.1.2 (11601.7.7)     |
| Firefox  | 50.0                  |

### Building

As a Python/Django app my solution does not really require building, in the sense of compilation or makefiles.

After installing PostgreSQL, a database will need to be created to hold the data from the app. Run the `psql` command to start the PostrgreSQL shell.

```shell
 CREATE DATABASE <db_name>
```

Then an admin user will need to be created with the ability to create databases (in order to successfully run the app tests).

```shell
CREATE ROLE <username> WITH LOGIN PASSWORD '<password>';
GRANT ALL PRIVILEGES ON DATABASE <db_name> TO <username>;
ALTER USER <username> CREATEDB;
```

Replacing `db_name`, `<username>`, and `<password>` with whichever you choose/are convenient.

Finally, the Django settings must be configured to use the database and user credentials you have specified. Open the `waveapp/waveapp/settings.py` file and replace the values in angle brackets, `<>`, with the values you chose from above:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': '<db_name>',
        'USER': '<username>',
        'PASSWORD': '<password>'
    }
}
```
### Running

In order for the app to be reachable the database and server must be started.

In order to start the PostgreSQL database run the following command:

```shell
postgres -D <path to postgres>
```

Where `<path to postgres>` is the path to `postgres` on your system. On my machine this is `/usr/local/var/postgres/`.

For my implementation I used Django's built-in web server. This web server is not made for production, but is fine for running and testing small apps. To start the Django web server navigate to the top-level directory and run the following command:

```shell
python manage.py runserver
```

To access the app open a web browser and open the address `http://127.0.0.1:8000/uploader/upload`. 


## What I Like About My Implementation

I really like how extensible the Django framework is. It makes it very easy to create, modify, and maintain the project. Apps are self-contained and are essentially plug-and-play.

The use of Python and Django also mean that the solution is cross platform and can be moved among platforms easily.

Additionally, Django handles a lot of security issues for developers. Submitting form data to Django means they are processed to built-in models which handle things like properly escaping input to avoid SQL injection.

## TODO

There are many things I would like to do with this app.

### Bugs
* There is currently no check for duplication. The same CSV can be added multiple times to atrificially increase the monthly totals.
* The file chooser dialog currently allows selecting non-CSV files, even though only CSVs can be processed.

### Usability
* The /uplaoder/ page is an unnecessary place-holder. The Upload functionality should be moved here instead of on a separate page.
* There is currently no way to get back to the upload page from the totals page.
* There is currently no way to view the totals without first submitting a CSV file.
* A navigation pane should be added to address the above two points.
* The app's interface is untested on mobile browsers.

### Future Considerations
* Although not specified for this app, the uploading functionality could expended to allow processing of different file types (JSON, XML, etc) by moving the parsing to a class or classes.

___

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
