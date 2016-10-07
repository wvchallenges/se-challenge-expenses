# Wave Software Development Challenge Completed by Harsh Gadgil

## What the application does - Overview:
The web application provides an interface to upload a .csv file. The data from the .csv file is then stored into a relational database. A table that aggregates the expenses by each month is then displayed to the user. 

## What the application does - Implementation details:
The application is implemented using Python/Django. This app is *not* intended to be used in production; and thus stores data in a SQLite RDBMS, which is relatively simpler to set up than more functional databases such as MySQL and Oracle SQL. The redundancy in the initial data is resolved by normalization resulting in two tables: Employees and Expenses. I felt that it was unnecessary to normalize further unless it would further optimize the database design. The [Pandas][1] data analysis library is used for data processing, pushing data to and reading data from SQL relations, and generating data as an HTML table. Using the CSV module would have been inefficient, not to mention tedious. The [dropzone.js][2] library is used to provide a drag and drop interface, as well as a clickable interface, for uploading files. Finally, the [toastr][3] library is used for displaying notifications on the UI. 

## Why I'm proud of my implementation:
My implementation is clean and minimal and does exactly, and only, what is it supposed to be do, and does (tries?) to do it well. The UI only has two major elements: a dropzone and the output table. Initially I had an upload button that would trigger a POST request to upload the file, but I later realized that it was unnecessary. I'm particularly proud of the unintrusive and elegant notifications displayed to the user using the toastr library. I'm also proud of using the Pandas data analysis library that allows for fast data processing, since its critical code paths have been written in Cython. 

## Installation instructions:
1. Install the [Anaconda][4] scientific distribution, which installs Python, Pandas, numpy and other related libraries for data processing. It is also possible to install dependencies separately. Anaconda 4.2.0, with Python 3.5 has been tested with this application.
2. Install Django, the web framework used to develop this application. Open a command prompt/terminal and execute the following:

   ```
   pip install Django==1.10.2
   ```
   Verify that Python can find Django. Execute **python** in your terminal and then the following, and make sure the version number is printed successfully. 
   ```
   >>> import django
   >>> print(django.get_version())
   1.10.2
   ```
3. Clone this repository using:

   ```
   git clone https://github.com/opensorceror/se-challenge.git
   ```
   Alternatively, download a .zip file of the repository.
4. Navigate to the project directory and run the following command:

   ```
   python manage.py runserver <port_number>
   ```
   If `port_number` is not specified, a default port number 8000 is used.
5. Navigate to **localhost:\<port_number>** in a browser. 


## Future work and potential improvements:
1. When the file is uploaded, I do not verify whether it contains the expected columns. This should be done in a production app, and upon invalid input, an message should be displayed.
2. Manual input in .csv files is prone to errors. Columns may contain mixed datatypes, and column names in different files may not always agree. For example, *pre-tax amount* can be written instead as *pre tax amount*. Since my current code relies heavily on these names being consistent, it might fail miserably in production if users upload files with inconsistent headers. In this case I would use a string similarity function such as Edit-distance or Jaro-Winkler to compare input header strings with expected, and only proceed if they are above a similarity threshold T. This threshold would need to be experimentally determined.  


[1]: https://github.com/pydata/pandas
[2]: https://github.com/enyo/dropzone
[3]: https://github.com/CodeSeven/toastr
[4]: https://www.continuum.io/downloads
