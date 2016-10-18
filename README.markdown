I really enjoyed solving the parsing problem. I like learning new things and applying them, so the exercise was really enjoyable since it allowed me to work with the django framework. I really like quick the setup process and how I can make my controllers (in this case "views") very simple.

In terms of my implementation, I really like how I seperated out the all logic of parsing and calculating to a service layer. This keeps the controller simple, as it should be, and makes it easier to find and reuse this logic if needed by other controllers or services.

#Setup Instructions:

* install django and python
* clone this repo
* enter the challenge the directory
* run 'python manage.py migrate'
* run 'python manage.py runserver' to create the server

#User Guide:
* open up a broswer and enter 'localhost:8000/subsidiary/upload'
* click the browse button and select a file to upload
* finally click upload
