# -*- encoding: utf-8 -*-
from app import db


class Category(db.Model):
    # id
    id = db.Column(db.Integer, primary_key=True)

    # name of category
    name = db.Column(db.String(255))