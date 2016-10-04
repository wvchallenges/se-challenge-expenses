from django.db import models
from django.db.models import Func, F, Sum


class Employees(models.Model):
    full_name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)


class ExpenseCategories(models.Model):
    category_name = models.CharField(max_length=200)


class TaxInformation(models.Model):
    tax_name = models.CharField(max_length=100)


class Expenses(models.Model):
    category = models.ForeignKey(ExpenseCategories)
    employee = models.ForeignKey(Employees)
    tax = models.ForeignKey(TaxInformation)
    date = models.DateField()
    description = models.CharField(max_length=250)
    pre_tax_amount = models.DecimalField(max_digits=10, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2)
    total_amount = models.DecimalField(max_digits=15, decimal_places=2)
