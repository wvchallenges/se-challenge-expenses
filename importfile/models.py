from django.db import models
from datetime import datetime

# Create your models here.
class Expense(models.Model):
    expense_date         = models.DateField()
    category             = models.CharField(max_length=512)
    employee_name        = models.CharField(max_length=512)
    employee_address     = models.CharField(max_length=512) 
    expense_description  = models.CharField(max_length=512) 
    pre_tax_amount       = models.DecimalField(max_digits=9, decimal_places=2)
    tax_name             = models.CharField(max_length=512)
    tax_amount           = models.DecimalField(max_digits=9, decimal_places=2)
    total_amount         = models.DecimalField(max_digits=10, decimal_places=2)
    file_name            = models.CharField(max_length=512)