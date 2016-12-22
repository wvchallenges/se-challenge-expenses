# -*- encoding: utf-8 -*-
import csv
from datetime import datetime

from app import db
from app.models.category import Category
from app.models.employee import Employee
from app.models.expense import Expense
from app.models.tax import Tax


class ExpenseRepository():
    """Repository to create and retrieve Expenses"""
    def from_csv(self, csvfile):
        categories = {}
        employees = {}
        taxes = {}

        data = csv.DictReader(csvfile)

        for row in data:
            if not row['category'] in categories:
                new_category = Category(row['category'])
                categories[row['category']] = new_category
                db.session.add(new_category)

            if not row['employee name'] in employees:
                new_employee = Employee(row['employee name'],
                                        row['employee address'])
                employees[row['employee name']] = new_employee
                db.session.add(new_employee)

            pre_tax_amount = float(row['pre-tax amount'].replace(',', ''))
            tax_amount = float(row['tax amount'].replace(',', ''))
            tax_percentage = tax_amount / pre_tax_amount

            if not row['tax name'] in taxes:
                new_tax = Tax(row['tax name'], tax_percentage)
                taxes[row['tax name']] = new_tax
                db.session.add(new_tax)

            # date, category, employee, tax, description, pre_tax_amount
            new_expense = Expense(
                datetime.strptime(row['date'], "%m/%d/%Y").date(),
                categories[row['category']],
                employees[row['employee name']],
                taxes[row['tax name']],
                row['expense description'],
                pre_tax_amount
            )
            db.session.add(new_expense)

        db.session.commit()
