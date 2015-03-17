# Wave Software Development Challenge 


#Requirements

You'll need the following installed to run the application

1. Python 2.7.x
2. pip to install requirements.txt (pip install -r requirements.txt)
3. MySQL


##Instructions

1. Clone this repository using git bash or any git tool.
2. open a terminal window and navigate to the application directory.
3. Run "pip install -r requirements.txt"
3. Create an empty database, and update the settings.py file with your database credentials and other information.
4. Run 'python manage.py migrate' to initialize the database tables.
6. Run the application using 'python manage.py runserver'.

## What Parts I'm Proud of In my Implementation

1) Making use of Python csv.reader to force some of my inputs to be Date and Decimals fields. This made data manipulation easier (like sorting by date and summing the total amounts).

2) Keeping track of an uploaded file using a now() timestamp to make the file unique every time. This way we don't add new values in the results page if we have the same file name.

3) Using a helper method 'custom_redirect' to add additional parameters to my HttpRedirect. That GET parameter was used to filter the results. The input to the DB is sanitized of course using the cursor.execute() method.

4) Using bootstrap for quick styling and a JQuery plugin called "file input" to ensure the upload of valid .csv files only.
