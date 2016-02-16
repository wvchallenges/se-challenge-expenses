import os

_basedir = os.path.abspath(os.path.dirname(__file__)) # Get this file's directory rather than pwd

DATABASE = _basedir + "database.db"
DEBUG = True
