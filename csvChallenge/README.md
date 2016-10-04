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

### My Adventure
This was my first time using Django other than a small talk I did on it when I was in school. I also had to dust off my Python knowledge so it was a great learning experience revisiting this framework and langauge. Really enjoyed being able to develop and play with an application with minimum setup time.

#### The Database
After stepping through the Django tutorial for a refresher. I started on one of my strengths and favorites which is the design of the database. Took out the whiteboard and started thinking about which tables could be used for a good relational database design. In the future should name the database with a singular scheme, makes the admin page look silly (i.e TaxInformations and ExpenseCategorys)

Tables:
- Employees: Holds the name and address of the employee. Could split the full_name into first and last, same goes for address. Possible pitfall, moving or changing name of an employee that is in the records more than once. This problem could be solved if every unique employee was given an employee number. Could use the ID but with this automatic upload and save there would need to be human intervention to differentiate people with the same name and same address.
- Categories: Holds the names of the expense category.
- Tax: Holds the name of the tax. At first I wanted to put in the tax rate for the given tax name. This could be derived from the sample CSV, but some of the numbers where off. If they were accurate however I would have placed the tax rate column back in. This also raises some questions on Keeping the tax rate updated VS Having the tax amount in the expenses table make sense.

![Database Scribbles](https://raw.githubusercontent.com/lawrencewong/se-challenge/master/DatabaseScribbles.jpg )

#### The Controller
The controller I made is super simple with a bunch of areas for improvement. It serves up two pages, gets the month/year total amount query and saves the it to the database from the upload CSV.

I used a raw query to retrieve data from the database. I was not in love with this solution, seemed like there should be a more Django-y way of getting the correct data. Maybe a more complicated model query with .value and .annotate. This would maybe avoid a work around I put in to spoof a 'Primary Key' in the query. I am retrieving the date as the id. This query's data could also be cached so save computation on every read, when there isn't new data. Future improvements could also query just the newest data instead of the entire history of the expenses.

I was a big fan of using the Django API capabilities especially uploading and reading the CSV from the POST call of the form. Seemed super nice and simple.

Saving the new expense logs in the CSV was also a breeze using Django's query set method ```get_or_create```. It was convenient for me because:
- No need to write a query to check if the same object exists in the database
- Returned a tuple of the newly created or existing object and the created status

With the returning object from the get_or_create call, I was able to just use that object and place it into the foreign key columns of the new expense record. Initially I thought I was going to need to use the ID of the object but it was way more intuitive. Awesome!

The data went into the models pretty nicely with the exceptions of the date format and the amounts. Solved by reformatting the date, and stripping the comma as well as casting the string into a float object. I decided to calculate the total amount of the expense, to put the penalty on write instead of read, where a bottle neck already exists because the absence of a cached result.

### Usage
- Get the server going with ```python manage.py runserver```
- Upload a CSV and it will show the month - year total expense amounts



### Installation
- Make sure python is installed ```python --version```
- Go and download pip installer script ```python get-pip.py```
- Install the virtual environment wrapper. This is for Windows ```pip install virtualenvwrapper-win```
- Get into the working environment ```workon Wave-Import-CSV```
- Install Django with pip ```pip install django```

### Tech
Technology used for this application:
* [Django] - Web framework
* [Python] - Scripting Language
* [SQLite3] - Simple Database tool
