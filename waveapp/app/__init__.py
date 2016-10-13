from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///%s' % os.path.join('./db/', 'wave.db')
db = SQLAlchemy(app)

from app import views, models

#Empty database after every app relaunch
db.drop_all()

db.create_all()
