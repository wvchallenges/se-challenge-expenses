### Wave challenge

#### requirements

* MySQL server
* python 2.7
* pip

If you don't have pip installed:

```bash
sudo apt-get install python-setuptools
sudo easy_install pip
#and might as well get this tool
sudo pip install virtualenv
```

#### installation

*NB: It's best to run the installation in a virtual environment. Although it's optional:*
```bash
#to set up virtual environment:
virtualenv venv
#to enter virtual env:
source venv/bin/activate
#to exit virtual env:
deactivate

#now the actual installation:
git clone https://github.com/andreixk/se-challenge
cd se-challenge
python setup.py install

#run the server:
python wtest
```
The server is now accessible via any browser:
`http://<server-ip-address>:5891/`
