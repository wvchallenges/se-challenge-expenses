from __future__ import unicode_literals

from django.db import models

# Originally had three models: Employees, Categories, and
# Expenses.  If I were creating this relational db for 
# production, I would definitely have stuck with that 
# layout, since it's a far better layout for searchability
# and record-keeping.  For simplicity, I've reduced the 
# three models to this single one.

# The table that keeps track of individual Expenses.
class Expenses(models.Model):
    date             = models.DateField('date expensed')
    employee_name    = models.CharField(max_length=100)
    employee_address = models.CharField(max_length=140)
    category         = models.CharField(max_length=64)
    description      = models.CharField(max_length=140)
    pretax           = models.FloatField(default=0)
    tax_name         = models.CharField(max_length=64)
    tax              = models.FloatField(default=0)
    # For editing the models in the interactive shell
    def __str__(self):
        return self.description