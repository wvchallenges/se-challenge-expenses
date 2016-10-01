# Wave CSV Importer

Lawrence Wong

### Feature Acceptance Criteria
- Your app must accept (via a form) a comma separated file with the following columns: date, category, employee name, employee address, expense description, pre-tax amount, tax name, and tax amount.
You can make the following assumptions:
- Columns will always be in that order.
There will always be data in each column.
There will always be a header line.
An example input file named data_example.csv is included in this repo.
- Your app must parse the given file, and store the information in a relational database.
- After upload, your application should display a table of the total expenses amount per-month represented by the uploaded file.


### Usage
```python manage.py runserver```

### Tech

Dillinger uses a number of open source projects to work properly:

* [Django] - Web Framework
* [Python] - Scripting Language
* [SQLite3] - Simple Database-ish tool
