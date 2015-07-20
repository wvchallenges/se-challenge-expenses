# Wave Software Development Challenge
Record Uploading program that takes a CSV file to populate expense records at a company and displays monthly expenses.

#Installation
* Python 2.7
* Django 1.8: `pip install django`
* pytz library: `pip install pytz`. See more [here](https://docs.djangoproject.com/en/1.8/topics/i18n/timezones/).
* Replace the Database info in `WaveChallenge/settings.py`:

```DATABASES = {
 'default': {
  'ENGINE': 'django.db.backends.your_db_chice',
  'NAME': 'your_db_name',
  'USER': 'user_name',
  'PASSWORD': 'user_pass',
  'HOST': 'localhost',
 }
}```

* Migrate models: `$ python manage.py makemigrations uploader` & `$ python manage.py migrate`
* Run server: `$ python manage.py runserver` and visit at: `127.0.0.1:8000`

## What I'm proud of?
* Clean UI: This interface is intuitive, clean and responsive. Bootstrap used to beautify the UI.
* Robust services: Manually handled exceptions to make sure code doesn't error out. 
* Modular, readable code: The code is kept simple and to-the-point and modularized with future use-cases in mind. Friendly variables used and comments included.


