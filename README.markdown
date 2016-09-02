Wave Expenses Application
=========================


Welcome to the Wave Expenses appliaction!

This application is used to migrate a customer's csv
expense files to a relational database.


Installation
============
This application should be installed to a virtualenv. For details on how to
setup a virtualenv see http://docs.python-guide.org/en/latest/dev/virtualenvs/.

    $ pip install -e .

Database Setup
==============

    $ pip install -e ".[migrations]"
    $ touch expenses.sqlite
    $ alembic upgrade head

Running
=======

*Development*

    $ pserve development.ini --reload

*Production*

    $ pserve production.ini --reload

The server will run on http://127.0.0.1:6543/ by default.

Installing Tests
================

    $ pip install -e ".[testing]"


Running Tests
=============

    $ nosetests


Implementation Details
======================

  I tried to keep the implementation as simple as possible, refactoring
functions into multiple functions whenever I felt that they were doing more than
a single unit of work. This resulted in code that is easier to test and
maintain. I chose to use an ORM (SQLAlchemy) and alembic to make future changes
to the DB easier to implement.
