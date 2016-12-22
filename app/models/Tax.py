# -*- encoding: utf-8 -*-
from app import db


class Tax(db.Model):
    # id
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # name of tax
    name = db.Column(db.String(255))

    # tax amount as a float
    amount = db.Column(db.Float)

    def __init__(self, name, amount):
        self.name = name
        self.amount = amount

    def __repr__(self):
        return '<Tax %r>' % self.name
