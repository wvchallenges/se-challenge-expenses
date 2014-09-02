# Wave Software Development Challenge - Submission
The following submission meets the requirement of creating a simple upload client that allows a user to upload a CSV file containing a dataset with predetermined headers in a particular order. What makes me pround of this application are the fact that, on the front end, it's: 
* Cross-browser
* Responsive
* Balanced and simple in design
* Takes advantage of mainstream libraries (Bootstrap, jQuery, Google Web Fonts)
* Works even if JS is disabled
* Readable even if CSS is disabled

And on the back end, it's:
* Function oriented
* Organized
* Clean and easy to debug
* Easy to expand in scope
    
Really, to summarize, what I'm most happy with is the fact that it's usable, clean and it works.     

# Getting it to run
The backend portion of the stack is Apache, MySQL and PHP. You'll have to connect to your DB set up to deposit data. On line 38 of processexpensefile.php, customize the line with the hostname, username, password and database name where the program will access and upload information:

$mysqli = mysqli_connect(hostname,username,password,database name);

The following MySQL query creates the table where the data that is uploaded is deposited.

CREATE TABLE employee_expenses(
expenseid int(11) NOT NULL AUTO_INCREMENT,
UNIQUE (expenseid), CHECK (expenseid>0), PRIMARY KEY (expenseid),
datestamp datetime,
expense_date date,
category varchar(255),
employee_name varchar(255),
employee_address varchar(255),
expense_description varchar(255),
pretax_amount decimal(11,2),
tax_name varchar(255),
tax_amount decimal(11,2)
)

Thanks for the challenge,

Ryan
