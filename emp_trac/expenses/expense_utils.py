# -*- coding: utf-8 -*-
#!/usr/bin/env python

import csv
import datetime
import decimal

from django.contrib.auth.models import User
from employees.models import Employee
from .models import Expense
from django.db import transaction

@transaction.atomic
def process_csv_file(csv_file):
    """
    Process the csv file and load it to the database.
    :param csv_file: Made up of date,category,employee name,employee address,
    expense description,pre-tax amount,tax name,tax amount
    :return: None
    """
    #

    csv_data = [row for row in csv.reader(csv_file.read().splitlines())]
    csv_headers = csv_data[0]
    del csv_data[0:1]
    # Rest all data
    Employee.objects.all().delete()
    User.objects.filter(is_superuser=False).delete()
    Expense.objects.all().delete()
    for csv_record in csv_data:  # Process each record
        json_record = csv_row_to_json(csv_record, csv_headers)
        first_name, last_name = json_record.get('employee name').strip().split()
        user, _ = User.objects.get_or_create(first_name=first_name, last_name=last_name,
                                             username='{0}_{1}'.format(first_name.lower(), last_name.lower()))
        user.save()

        employee, _ = Employee.objects.get_or_create(user=user)
        employee.address = json_record.get('employee address', None)
        employee.save()

        expense = Expense()
        date = json_record.get('date', '')
        if date:
            date = datetime.datetime.strptime(date, '%m/%d/%Y')
        expense.date = date
        expense.employee = employee
        expense.description = json_record.get('expense description', None)
        expense.amount = decimal.Decimal(json_record.get('pre-tax amount').replace(",", ""))
        expense.tax_name = json_record.get('tax name')
        expense.tax_amount = json_record.get('tax amount')
        expense.tax_rate = decimal.Decimal(expense.tax_amount/expense.amount)
        expense.category = json_record.get('category')
        expense.total_amount = expense.tax_amount + expense.total_amount
        expense.save()


def csv_row_to_json(csv_record, headers):
    """
    :param csv_record: a single record from a csv file
    :param headers: the headers for the csv file
    :return: the record in json_format
    """
    json_record = dict()
    for key, value in enumerate(csv_record):
        try:
            if headers[key] != '':
                json_record[headers[key].lower()] = value.strip()
        except IndexError:
            continue
    return json_record


