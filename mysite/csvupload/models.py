from django.db import models


class EmployeeExpenses(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)  # If records get
    updated_on = models.DateTimeField(auto_now=True)      # updated manually
    date = models.DateField()
    category = models.CharField(max_length=50)
    employee_name = models.CharField(max_length=100)
    employee_address = models.CharField(max_length=200)
    expense_description = models.CharField(max_length=200)
    pretax_amount = models.DecimalField(max_digits=9, decimal_places=2)
    tax_name = models.CharField(max_length=50)
    tax_amount = models.DecimalField(max_digits=9, decimal_places=2)

# Create your models here.
