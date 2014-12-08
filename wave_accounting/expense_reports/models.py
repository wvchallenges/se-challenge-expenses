from django.db import models

class Expenses(models.Model):
    date = models.DateField()
    category = models.CharField(max_length=100)
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    pretax_amount = models.DecimalField(decimal_places=2,max_digits=6) # up to 10K. So doens't work for Tim Cook's private jet travel expenses.
    tax_name = models.CharField(max_length=50)
    tax_amount = models.DecimalField(decimal_places=2,max_digits=6)
