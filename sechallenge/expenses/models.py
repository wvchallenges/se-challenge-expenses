from django.db import models


class Expenses(models.Model):
    expense_id = models.AutoField(primary_key=True)
    filename = models.CharField(max_length=50, blank=True)
    date = models.DateField()
    category = models.CharField(max_length=50)
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    pretax = models.BigIntegerField()
    taxname = models.CharField(max_length=50)
    tax = models.BigIntegerField()
