# Running Instructions
1. Install Django, I wrote this app with Django 1.10.3 but im sure older versions should be fine
2. Navigate to this folder and run the server (python manage.py runserver)
 1. Most likely wont need to recreate the database but if migrations are needed
 1. python manage.py makemigrations
 1. python manage.py migrate
3. Navigate to the server (my default was 127.0.0.1:8000)
4. Go to /newCompany/upload to select and upload the csv file
5. Go to /newCompany/monthly to see monthly tax data
6. Go to /newCompany/data to see the uploaded csv data

# Quick Notes
I've have tried to do a small project with Django but I was left very confused at the end.
During this implementation of this web application I felt I finally understood how
everything flows together, at least for things I have done. So Im pretty proud
that I was able to implement this somewhat quickly considering I didn't have much
experience with Django.
