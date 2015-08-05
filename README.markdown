This is my submission for a software engineering challenge. The original problem description can be found at the bottom of this readme.

# My Solution
My solution is a very simple Ruby on Rails application. The root page of the site allows uploading a CSV file containing expense report data. After the upload, the expense data is stored in a local SQLite database. Furthermore, the page is re-directed to the 'Expense Summary' page where all expenses are grouped by month and tallied up.

What I like about my implementation is how I've decoupled the submission format (CSV) from the underlying data model. I created a factory class that takes the parsed CSV file and generated the ExpenseSheet model and associated Expense objects. This allows the data transformation logic to be unit-tested independently from other logic such as the expense summary tally. It opens the door for more submission formats later. Also, while the requirements didn't say that you need to be able to call up an expense summary page on demand for any sheet, the way I've designed the controller makes it easy to do this, and in the future allow picking any report from a list.

There are a couple of things I wish I could have done better:
1. Validate that a file was chosen before attempting to submit
2. Validate the data type in each column (assumptions only stated data would be present in each column, not that it would be valid)
3. Display appropriate error pages in these cases, instead of RoR default error pages.


## Original Project Description
Imagine that Wave has just acquired a new company. Unfortunately, the company has never stored their data in a database, and instead uses a comma separated text file. We need to create a way for the new subsidiary to import their data into a database. Your task is to create a web interface that accepts file uploads, and then stores them in a relational database.

### What your web-based application must do:

1. Your app must accept (via a form) a comma separated file with the following columns: date, category, employee name, employee address, expense description, pre-tax amount, tax name, and tax amount.
1. You can make the following assumptions
 1. Columns will always be in that order
 2. There will always be data in each column
 3. There will always be a header line

 An example input file named `data_example.csv` is included in this repo.

1. Your app must parse the given file, and store the information in a relational database.
1. After upload, your application should display a table of the total expenses amount per-month represented by the uploaded file.

Your application should be easy to set up, and should run on either Linux or Mac OS X. It should not require any non open-source software.

There are many ways that this application could be built; we ask that you build it in a way that showcases one of your strengths. If you you enjoy front-end development, do something interesting with the interface. If you like object-oriented design, feel free to dive deeper into the domain model of this problem. We're happy to tweak the requirements slightly if it helps you show off one of your strengths.

Once you're done, please submit a paragraph or two in your `README` about what you are particularly proud of in your implementation, and why.
