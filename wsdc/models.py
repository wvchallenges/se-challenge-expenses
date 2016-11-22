"""Models used in the wsdc app."""
import csv
from io import StringIO
from datetime import datetime
from decimal import Decimal

from django.db import models


class Category(models.Model):
    """Employee Categories."""

    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Company(models.Model):
    """Stores the csv data for a company."""

    name = models.CharField(max_length=70)
    csv_file = models.FileField(upload_to='uploads/')

    def create_employee_data(self):
        """Parse csv file and create employees.

        Don't check headers as always the same and always in the same order.
        """
        self.csv_file.open(mode='r')
        csvf = StringIO(self.csv_file.read().decode())
        row_reader = csv.reader(csvf, delimiter=',', quotechar='"')
        rows = []
        for row in row_reader:
            rows.append(row)
        for row in rows[1:]:
            category = Category.objects.create(
                name=row[1]
            )
            # convert date for use with datetime object
            self.employees.create(
                date=datetime.strptime(row[0], '%m/%d/%Y'),
                employee_name=row[2],
                employee_address=row[3],
                expense_description=row[4],
                pre_tax_amount=Decimal(row[5].replace(',', '')),
                tax_name=row[6],
                tax_amount=Decimal(row[7].replace(',', '')),
                category=category,
            )

    def __str__(self):
        return self.name


class Employee(models.Model):
    """A model used to store employee data."""

    # fields
    date = models.DateField()
    category = models.ForeignKey(Category, related_name='employees')
    employee_name = models.CharField(max_length=70)
    employee_address = models.CharField(max_length=100)
    expense_description = models.TextField()
    pre_tax_amount = models.DecimalField(decimal_places=2, max_digits=10)
    tax_name = models.CharField(max_length=20)
    tax_amount = models.DecimalField(decimal_places=2, max_digits=10)

    # relations
    company = models.ForeignKey(Company, related_name='employees')
