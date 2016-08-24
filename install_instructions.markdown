# Installation Steps:


#### Requirements:

* Python 3.5

##
*NOTE: You can use homebrew to install python 3.5.(http://brew.sh/), Then, `brew install python3` to install python 3.5*

##

- Once we have python 3 installed, we need to create a lightweight virtual environment to run django, one way to create a virtual environment is using python 3.5 `venv` command
```
$~: python3 -m venv challenge
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

*Note: You can use any kind of virtual enviroment of your choice*
