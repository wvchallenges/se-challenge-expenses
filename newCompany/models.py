from __future__ import unicode_literals

from django.db import models

# Create your models here.


class Database(models.Model):
    Date = models.DateField()
    Category = models.CharField(max_length=200)
    EmployeeName = models.CharField(max_length=200)
    EmployeeAddress = models.CharField(max_length=200)
    ExpenseDesc = models.TextField()
    PreTaxAmt = models.DecimalField(max_digits=19, decimal_places=2)
    TaxName = models.CharField(max_length=200)
    TaxAmt = models.DecimalField(max_digits=19, decimal_places=2)
