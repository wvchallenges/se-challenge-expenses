DEPLOY INSTRUCTIONS
===================

FILES IN PACKAGE
----------------
config.php  databaseIO.php  database.sql  data_example.csv  index.php  scanForm.php  style.css

Before running the application, go to config.php and enter the "define settings" at the top to connect to the
proper MySQL database.  Run the .sql file attached on the appropriate database you intend to use the application
on.

DESIGN
======

For this application, I chose to simply use MySQL, PHP7, and HTML.

I partitioned the application into 3 views sequentially, to make it flexible and simple enough to update.  The idea
is to guide the user through the process as well as troubleshoot each individual process along the way.

Users interact at each step before making the update to the database, they will see the data before it goes into the database
as it will be entered.  This is necessary for the user to pick up on any errors or issues before they do the final
commitment to the database.

HTML is used purely as a form for user interaction and confirmation, PHP is used as the language of choice for triggering
errors and correct display because of the level of interaction with the database and files.  I used mostly Bootstrap
for my css simply to save time.

The table in the database was set simple because I did not have enough time to spend on the project and there
were still a few questions required to design a proper relational database, likely I would prefer to split
the table into a user table and a transaction table.

Datatypes used for the database was the DATE, VARCHAR, FLOAT, and BIGINT for id.  These were respectful to the data
types they accepted.

PROS
----

- It's easy to update.
- User friendly.
- Error checking is not bad.
- Displays well.
- The application is efficient.
- Covers the datatype that was present in the sample file.

CONS
----

- Database is not completely relational.
- Has not been tested extensively.



By jjfive (YQT)
