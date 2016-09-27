## How to set up this project
* create an empty vagrant directory  
cd vagrant_directory  
git pull the files from this github repository  
vagrant up  

* go to shared vagrant directory:  
cd /vagrant  
* create database company:  
psql  
create database company;  
\q  
* set up database:  
python database_setup.py  
(You might need to change the passwords setting at line 31 to be able to connect to the database)  
* start server:  
python main.py  
* open browser, type: localhost: 5000/  


## Implementation
### Back-end
* I set up a virtual development environment using Vagrant and installed Apache2, PostgreSQL, Flask, and SQLAlchemy.
* PostgreSQL database communicates with the program through SQLAlchemy.
* I also used Flask to set up HTML templates and URLs.
* Database schema:  
expense(id, data, category, employee, description, pre_tax, tax_name, tax_amount)  
employee(p_id, name, address)  
Instead of saving each expense row directly to the database, this design can reduce data redundancy  


### Front-end
* I used some Bootstrap for styling the web pages and created charts with Pygal framework.
* I also used Flask(Jinja) to style the top menu button to improve user experience.  
  It changes border color when selected.  
* A print button is provided so that user can print the report with one click.  
  I used window.print() function instead of generating a PDF file for a fast solution.  
  I will try to use Pdfkit later.  
