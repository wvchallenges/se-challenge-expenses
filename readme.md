Base on Python3

install Mysql connector for corresponding platform
pip install -r requirements.txt

# create table
```bash
mysql -u root -p
mysql> create database test;

#Add environment variable
```bash
export FLASK_APP=${PWD}/app.py
```

# initial database
flask initdb

# run app
flask run 

Then open localhost:5000 on browser
There are four URLs in this small project.
localhost:5000/ can check total list of all uploaded file, each row is a ref to detail
localhost:5000/upload you can upload a csv file
localhost:5000/file_id you can view detail of one file
localhost:5000/file_id/expense-detail you can view expense detail counted by month of one file
