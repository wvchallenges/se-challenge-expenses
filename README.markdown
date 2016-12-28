# Build steps:
Python Dependencies:
- bottle
- sqlalchemy

If pip or python 2.7 has not been installed:
```
sudo brew install pip || sudo apt-get install python-pip
sudo brew install python 
```
Install dependencies:
```
sudo pip install bottle
sudo pip install sqlalchemy
```

# Running locally:
run `./app.py` to start the server (may need to `chmod +x app.py`)

visit the app at [http://localhost:8080/]()


# Comments
- I feel like the models are setup nicely, and can be extended easily for additional functionality. 
- Might have put an index on Employee.name, but there is no use for that presently.
- Some questionable decisions are the rest of the functions in the file;
- `expense_breakdown_monthly` is a really specific query and it should live with the breakdowns endpoint.
- `get_or_create` is pretty inefficient and doesn't commit the session, which may lead to bugs if the project continue.
- I didn't see a need to persist the data in an actual database or file, so its being stored to a sqlite backed up by memory.
- In app.py the biggest problem is passing around the single session object for the entire server process, its not a problem on localhost but it can easily be made more flexible by using some libraries that manages db conns (bottle-sqlalchemy). 
- Expense_month and expense_year isn't really needed on the expense model, I added them because sqlite doesn't support extrapolating year and date from timestamps.  
- I did not prioritize styling in this project.
- The index page should be been made into a template.
