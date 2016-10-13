##About my approach
I built my application using the Python Flask framework. The CSV data is written to a SQLite Database.
I left the front end very bare bones as I wanted to focus on using an Object Oriented approach on the back end. 
I was able to accomplish this using the SQLAlchemy package to map data fields to an Expense class. This approach simplified the data processing required to produce the monthly total table. I have not used a Python ORM before this so I was happy to learn something new and was impressed with how easy it was to implement.

##Installation Instructions
1. Create virtual environment inside /waveapp
$ cd waveapp/
$ virtualenv venv

2. Activate virtual environment and install required packages
$ . venv/bin/activate
(venv) $ pip install Flask
(venv) $ pip install flask-sqlalchemy

3. Grant permissions to run.py and start server
(venv) $ chmod a+x run.py 
(venv) $ ./run.py  