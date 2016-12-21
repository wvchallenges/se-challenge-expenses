# -*- encoding: utf-8 -*-
from app import db


class Expense(db.Model):
    # id
    id = db.Column(db.Integer, primary_key=True)

    # date
    date = db.Column(db.Date)

    # category
    category = db.relationship(
        'Category',
        backref=db.backref('expenses', lazy='dynamic')
    )

    # employee
    employee = db.relationship(
        'Employee',
        backref=db.backref('expenses', lazy='dynamic')
    )

    # tax
    tax_id = db.Column(db.Integer, db.ForeignKey('tax.id'))
    tax = db.relationship('Tax')

    # expense description
    description = db.Column(db.String(255))

    # pre-tax amount
    pre_tax_amount = db.Column(db.Float)
