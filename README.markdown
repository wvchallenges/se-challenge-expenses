## Setup

Create a virtual environment in which to install Python pip packages. Virtual environment activation with [virtualenv](https://pypi.python.org/pypi/virtualenv),

    virtualenv venv          # create virtualenv venv
    source venv/bin/activate # activate 

or with [virtualenvwrapper](http://virtualenvwrapper.readthedocs.org/en/latest/),

    mkvirtualenv myproj       # create and activate environment
    workon myproj             # reactivate existing environment

Install development dependencies,

    pip install -r requirements/development.txt # Django==1.10

Setup database tables,

    python manage.py makemigrations upload_app  # create neccessary tables in the database e.g. Employee, ExpenseItem models
    python manage.py migrate

Run the web application locally,

    python manage.py runserver # 127.0.0.1:8000
    
## Proud of:

Yes, there were many ways that this application could have been built; particulary I am proud of (in my implementation of the application) the following in
no particular order:

### 1. Testing - because it may show I thought about edge cases that typically involve input values that require special handling.
For example: 
a. uploading an invalid CSV file
b. duplicate rows/database integrity errors (what if the user uploaded the same file more that once - this action should be idempotent, that is,
denoting an element of a set that is unchanged in value when multiplied or otherwise operated on by itself).
c. Floating point calculation issues:
E.g. when I initially set the total_amount field in my ExpenseItem model to be a FloatField I noticed I would get duplicates in my ExpenseItem table for
the followin input row:
12/14/2013,Computer - Software,Tim Cook,"1 Infinite Loop, Cupertino, CA 95014",Microsoft Office, 899.00 ,CA Sales tax, 67.43 
So, I decided to use an IntegerField and work with cents instead after reading some post on Stackoverflow so I would need to deal with
floating point calculation issues.
### 2. Problem solving skills - because it may show how I thought about things thoroughly from many angles, my logic, what things to consider (duplicates), how I could scale things, such as, 
handling large input file (~ 2GB)..., or eventually dealing with asynchronous processing and how to handle a long running process (using threads/multiporcessing, Celery/Redis, AWS SQS), 
what relationship to use between an Employee and Expense Item (E.g. one-to-many), researching skills (floating point calculation issues)
### 3. Technical skills - because it may show my skills and expertise level in using Django (e.g. queries) and Python (data structures - lists, dicts...) as a whole.

    
    
    
    
