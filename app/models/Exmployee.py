# -*- encoding: utf-8 -*-
from app import db


class Employee(db.Model):
    # id
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # full name of employee
    name = db.Column(db.String(255))

    # employee's full address
    address = db.Column(db.String(255))

    def __init__(self, name, address):
        self.name = name
        self.address = address

    def __repr__(self):
        return '<Employee %r>' % self.name
