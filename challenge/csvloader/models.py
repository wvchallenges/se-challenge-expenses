from datetime import datetime

from django.conf import settings
from django.db import models


class Import(models.Model):
    """
    Keep track of what was imported, by whom, and when.
    """
    date = models.DateTimeField(default=datetime.now)
    imported_by = models.ForeignKey(settings.AUTH_USER_MODEL)
    raw_data = models.TextField()


class Expense(models.Model):
    """
    Extremely direct modeling of the source CSV data.
    """
    date = models.DateField()
    category = models.CharField(max_length=200)
    employee_name = models.CharField(max_length=200)
    employee_address = models.TextField()
    expense_description = models.CharField(max_length=200)
    pre_tax_amount = models.DecimalField(max_digits=20, decimal_places=2)
    tax_name = models.CharField(max_length=50)
    tax_amount = models.DecimalField(max_digits=20, decimal_places=2)
