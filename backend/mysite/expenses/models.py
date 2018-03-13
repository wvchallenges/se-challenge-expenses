from django.db import models

class Expense(models.Model):
    #date                = models.DateField(auto_now=False)
    date                = models.CharField(max_length=10)
    category            = models.CharField(max_length=100)
    employee_name       = models.CharField(max_length=100)
    employee_address    = models.CharField(max_length=100)
    expense_description = models.CharField(max_length=100)
    pre_tax_amount      = models.DecimalField(decimal_places=2, max_digits=10)
    tax_name            = models.CharField(max_length=20)
    tax_amount          = models.DecimalField(decimal_places=2, max_digits=10)


class FileUpload(models.Model):
    datafile = models.FileField()