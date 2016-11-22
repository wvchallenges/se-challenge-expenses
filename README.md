# Wave Challenge - Olsi Spahiu
----
###Intro
I decided to take a very lightweight approach to completing this assignment. My first initial first reaction was choosing which stack to use. I'm most comfortable with Python as my server-side language of choice. I decided to use **Flask** as the web-framework. 

The reasoning being that Flask makes it really easy to setup lightweight applications, and cuts down on bloat/boiler-plate quite a bit. I decided to also use **SQLite** as my database system (*for similar reasons to using Flask*).

----
###Implementation
For this particular assignment I kept the front-end elements very simple. Using a `form` to accept file uploads styled with **Bootstrap** created the minimal look I was going for. Displaying the expenses was done using a template.

As for the file processing itself, all of the file parsing, and storing to the database is done server side, and served to the client once all of the processing is completed. 

I'm particularly proud of how I parse the `.csv` file and extract the expense data while also grouping it with their respective dates. I implemented the entire processing using a **Pandas** dataframe, and Python's standard collections. This is all done in a very functional manner, with no side-effects involved in the calculation of the expenses. Once the final calculations are returned (*an* `OrderedDict`), they are passed to the template to display to the user.

###Set Up
The set up for this application should be rather simple. The full stack below:

- Python 2.7
- Flask (Jinja2, Werkzeug)
- SQLite3
- SQLAlchemy
- Pandas, numpy

Once all of those tools are installed. Run `se_challenge.py` (*located within the project root*) to start the server.

You should now be able to access the application in your browser.