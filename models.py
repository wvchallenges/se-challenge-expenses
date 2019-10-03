'''
Created on Feb 10, 2018

@author: ezliuti
'''
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class ExpensesTable(db.Model):

    ''''expense table mapped object'''

    __tablename__ = 'expenses'

    id = db.Column(db.Integer, primary_key = True)
    date = db.Column(db.String(255), nullable = False, index = True)
    category = db.Column(db.String(255), nullable = False, index = True)
    employee_name = db.Column(db.String(255), nullable = False, index = True)
    employee_address = db.Column(db.String(255), nullable = False, index = True)
    expense_description = db.Column(db.String(255), nullable = False, index = True)
    pre_tax = db.Column(db.Float, nullable = False, index = True)
    tax_name = db.Column(db.String(255), nullable = False, index = True)
    tax = db.Column(db.Float, nullable = False, index = True)
    file_name = db.Column(db.String(255), nullable = False, index = True)

class TotalExpensesPerMonth(db.Model):

    ''''An intermediate relation table for expense per month mapped object'''

    __tablename__ = 'expenses_per_month'

    id = db.Column(db.Integer, primary_key = True)
    month = db.Column(db.String(20), nullable = False, index = True)
    expense = db.Column(db.Float, nullable = False, index = True)
    # No foreign key here due to performance concern. Will update constraint condition manually to keep integrity
    file_name = db.Column(db.String(255), nullable = False, index = True)

    db.UniqueConstraint('month', 'file_name')

class FileTable(db.Model):
    __tablename__ = 'file_table'

    id = db.Column(db.Integer, primary_key = True)
    file_name = db.Column(db.String(255), nullable = False, index = True, unique = True)
