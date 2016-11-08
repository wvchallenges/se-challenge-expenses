from django.db import models

class Expense(models.Model):
  date = models.DateField()
  category = models.CharField(max_length=50)
  name = models.CharField(max_length=50)
  address = models.CharField(max_length=100)
  description = models.CharField(max_length=50)
  pretax_amount = models.DecimalField(max_digits=8, decimal_places=2)
  tax_name = models.CharField(max_length=50)
  tax_amount = models.DecimalField(max_digits=6, decimal_places=2)

  def __str__(self):
        return self.name
  
