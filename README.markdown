## Manor Freeman - Wave SE Challenge Submission

### Setup and Running of Application
1. Clone Repository:
     git clone https://github.com/manorfreeman/se-challenge.git
2. This project was tested with python 2.7.5, please ensure that this version of python will be used for running this application. Note, this project was only tested on linux (CentOS 7.1)
3. Create and start a virtual environment within the cloned directory(optional):
     virtualenv env --no-site-packages
     source env/bin/activate
4. Install project dependencies by running the following command within the cloned directory:
     pip install -r requirements.txt
     **This will result in only django 1.9.7 being installed
5. Run the app with the command:
     python manage.py runserver
6. Visit localhost:8000 on your browser to begin using the app
7. Contact manorfreeman@gmail.com if you would like credentials to try the admin console at localhost:8000/admin with the existing superuser account

### Project Emphasis
I chose to put the emphasis of my efforts for this project on implementing "smart" error handling, because I believe this is one of the most important aspects of parsing csv and also leverages one of the more powerful features in django, model validation. In order to implement "smart error handling", I chose to write the program such that it continues parsing and writing to the database even after encountering errors (when possible), and returns a list comprised of each error that was encountered so that users can identify exactly which lines failed and why, correct the errors, and re-upload the failed expense/employee records. I also tried to avoid data redundancy by serializing each csv record into an employee object and the employee's associated expenses (one-to-many), and only inserting an employee into the database if their (name, adress) combination has not been encountered previously. Since expenses are not necessarily unique, they do not need explicit uniqueness checks/indexes.

