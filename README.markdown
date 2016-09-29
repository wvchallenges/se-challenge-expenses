# Wave Software Development Challenge

## Notable Design Choices

The given expense data contains redudant data by including an employee name and
address on each expense item. To reduce the size of the data the database
caused by the redundant employee information, we create a separate table for 
employee information. Expense items in the Expense table contain a foreign key 
to the employee that is responsible for submitting the expense.

We use an in-memory caching to cache employees that have had expenses added
recently to reduce hitting the database during file uploads. A query to the
Employee table for each line of expense from the uploaded file is necessary
because the employee responsible for the expense may already exist in the
database. In the case of large files with many rows of expenses, this leads to
a very high workload on the database. Since a single file is very likely to 
repeat employes, the in-memory cache can reduce the probability that the
database will be hit with a query, subsquently leading to a reduction of the
workload on the database.

## Assumption
The solution to the challenge crated with the assumption that employees in the
files can be uniquely identified by their name and address combination.

## Software Requirements
The application was developed and designed with the following software
versions on Ubuntu 14.04:
* Python 2.7
* PostgreSQL 9.3

On Ubuntu, run the following command to install the required software:
```
sudo apt-get install python postgresql
```

Refer to [this guide](https://techarena51.com/index.php/flask-sqlalchemy-postgresql-tutorial/)
to set up a PostgreSQL user, password, and database.

## Set-up
Ensure that the software in the Software Requirements are installed for your
operating system. Perform the following inside the `se-challenge` directory.

1. Run `pip install -r requirements.txt`
2. Modify line 34 in `app.py` with your user, pasword and database.
```
34. app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://<username>:<password>@localhost/<database>'
```
3. Run the `python` interpreter from command line. We need to create the tables
for the application.
4. In the Python interpreter, type the following:
```
>>> from app import db
>>> db.create_all()
>>> quit()
```
The application is now ready to be run.

## Running
Run the following from inside the `se-challenge` directory:

1. `export FLASK_APP=app.py`
2. `flask run`

Optionally, run `export FLASK_DEBUG=1` to run with debugger on.

Visit `http://localhost:5000/` to view the application.
