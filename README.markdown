![](http://i.imgur.com/ElLWkwc.png)

# What is MoCalc?

MoCalc is an application that allows you to upload a CSV file and calculate the monthly expenses. MoCalc also allows you to visualize the expenses for each month, for each file uploaded. 

![](http://i.imgur.com/w5JLw2f.png)

## Building and running MoCalc:

MoCalc is built in the Django web framework. To build the project, navigate to the directory downloaded from this repository and run the following commands:

``python manage.py makemigrations``

``python manage.py migrate``

``python manage.py runserver``

Then, in your browser, navigate to ```http://127.0.0.1:8000/upload/list_files/``` to upload files. 

## How does it work?

To get started, first upload a CSV file. After you've uploaded your CSV file, you will be presented with a list of uploaded content. Click on the links to see a more detailed view of the spreadsheet. 

![](http://i.imgur.com/bFNvnyO.png)

## Viewing Spreadsheet Data

Once you click on the link corresponding to the uploaded CSV file, you will be presented with the table of all months and the corresponding total amounts spent for each month. 

![](http://i.imgur.com/IkBswRO.png)

A dropdown select box enables you to view the total monthly expenses on a month-by-month basis. 

![](http://i.imgur.com/wYVD0VD.png)

## Dependencies:

1. Django >= 1.9
2. Python 3

## Question: "What you are particularly proud of in your implementation, and why."

I've programmed in Python for a number of years, but this was my foray into Django. Knowing that Wave uses Django, I wanted to show that I am able to quickly learn and build something with a technology that is unfamiliar to me. Going from zero to this simple project was a really fun experience in learning Django, and I hope to continue my knowledge and experience with this technology! 

Another two aspects that make me proud of this project are:

1. The ability to upload multiple files, and links that correspond to the monthly expense information for each file uploaded. 

2. The charting by year for each month capability was something that I think adds a nice touch to this project. 

 