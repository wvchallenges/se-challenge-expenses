from django.db import models


class Expense(models.Model):
    date = models.DateField()
    category = models.TextField()
    emp_name = models.TextField()
    emp_address = models.TextField()
    exp_description = models.TextField()
    pre_tax = models.FloatField()
    tax_name = models.TextField()
    tax = models.FloatField()