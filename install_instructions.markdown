# Installation Steps:

Following are instructions on how to setup the project on OSX,
#### Requirements:

* Python 3.5

##
*NOTE: You can use homebrew to install python 3.5.(http://brew.sh/), Then, `brew install python3` to install python 3.5*

##

- Once we have python 3 installed, we need to create a lightweight virtual environment to run django, one way to create a virtual environment is using python 3.5 `venv` command
```
$~: python3 -m venv challenge
Note: You can use any kind of virtual enviroment of your choice.
```
- We will then make this virtual enviorment active and install django 1.10 in it.
```
$~: source challenge/bin/activate

$~: pip install django~=1.10.0
```
- Once django is installed clone forked se-challenge repository.
```
$~ cd challenge

$~ git clone https://github.com/TinyHook/se-challenge.git
```
- Once we have cloned the repository go into the root of the project where you can find `manage.py` file. We are using Sqlite for this project and dont need any extra setting for mysql. In the project root run the following command to run all the migrations.
```
$~ ./manage.py migrate
```
- Once the migrations are finished we can run the django server. You will be able to access the site at the URL provided by following command. Usually its 127.0.0.1:8000.
```
$~ ./manage.py runserver
```
