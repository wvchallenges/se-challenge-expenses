# Wave se-challenge solution
### Documentation
This easy migration application provides Wave employees a simple and modern user interface to upload expenses of employees of newly acquired company.
The expenses in the form of csv files are stored in wave's database for easy integration with wave's current and future applications. 
In addition to migration, the application also reports aggregate expenses per month to track expenditure trends at the acquired company. 

### Instructions on running the application
1. navigate to `<checkout-dir>/se-challenge/wvchallenge`
1. requires Python 3
1. create database structure `python manage.py migrate`
1. run the application using `python manage.py runserver`
1. open your favourite browser and type `http://<ip_addr/hostname>:8000`

### Proud of the following 
1. only requires django framework and nothing else 
1. using DateField inheritance to convert input date format into django's required date format 
1. correctly handling decimal numbers by using locales rather than stripping comma separators from string and converting striped strings to numeric
1. using modern material design in compliance with Wave's color themes
