# Expense Monster

This is an expense processing application. Expense Monster is a Django/Mysql web application form used for parsing csv files from Wave-acquired companies. The application has 1 main function: ```eat_expenses (file_name.csv)```
which can be run via the django command line or alternatively via the applications online webform found at ```http://localhost:8000``` when run locally.

Requirements:

* Django
* MySQL
* django-encrypted-fields


## Data Storage & Encrypted Fields

The data in most/all of Expense Monster is stored in a MYSQL database in relational format. The fields that are consumed by Expense Monster are encrypted in the MYSQL database to protect the sensitive data at-rest.

## Setting Up Local Dev Environment

Expense Monster should be installed in an isolated Linux enviornment using [virtualenv](https://virtualenv.readthedocs.org/en/latest/). Expense Monster was built within a Ubuntu LTS Server v. 14 and it is recommended to deploy EM (Expense Monster) in a Ubuntu Server.

To get started with Expense Monster follow the steps below:

1. Clone this repository ```git clone git@github.com:nicholasaleks/se-challenge.git```
2. install the dependencies
3. install mysql:

    ```
    apt-get install mysql-server mysql-client libmysqlclient-dev
    ```

4. install python 2.7
5. install pip
6. install virtualenv and virtualenvwrapper [How to setup virtualenv & django](https://www.jeffknupp.com/blog/2012/02/09/starting-a-django-project-the-right-way/)
7. install pip requirements (this includes django v. 1.9)

    ```
    pip install -r requirements.txt
    ```

7. Setup the database users correctly

	```
	create user em@localhost identified by 'em';
	grant all privileges on em.* to em@localhost;
	```

8. create a basic keyczar keyset. ```AES-256``` in this case.

	```
	$ mkdir fieldkeys
	$ keyczart create --location=fieldkeys --purpose=crypt
	$ keyczart addkey --location=fieldkeys --status=primary --size=256
	```

## Importing CSV for consumption via command line

To import a CSV use the management command:

    python manage.py eat_expenses (file_name.csv)

## Webapp front-end

Expense Monster comes with a simple and easy-to-use bootstrap responsive web page. It includes a file input button that is used to upload the csv file, once the file has been uploaded the same webpage displays the total expenses per month for each year. This report dynamically changes depending on the number of expense reports uploaded.

 TODO: Warning - There is no exception handling for preventing the same csv file from being uploaded more then once. (We might be able to take the file name, file size as a pre-check and follow up with a detailed line-by-line check to prevent duplication)

The Expense Monster webpage also manages all the csv files that have been uploaded on the bottom of the page. If you accidently uploaded an obsolete csv file you can simply delete it from the monster by clicking the "x" next to the csv file table.

## Product Roadmap

   Instead of using a webapp interface to upload countless csv files, I think it would make more sense to eventually expand on the eat_expenses command to replace the file_name parameter with a directory parameter that will locate all csv files and consume them all like a monster would. This will help save time for the individual who has to upload expense file, after expense file, after expense file.