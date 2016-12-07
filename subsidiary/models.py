from django.db import models

class Employee(models.Model):
    employee_name = models.CharField(max_length=200)
    address_line1 = models.CharField(max_length=200)
    address_line2 = models.CharField(max_length=200)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=2)
    zip_postal = models.CharField(max_length=7)

class Category(models.Model):
    category_name = models.CharField(max_length=50)
    
class Tax(models.Model):
    tax_name = models.CharField(max_length=50)

class Expense(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.PROTECT)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    expense_date = models.DateField()
    description = models.TextField()
    tax = models.ForeignKey(Tax, on_delete=models.PROTECT)
    pretax_amount = models.DecimalField(decimal_places = 2, max_digits = 10)
    tax_amount = models.DecimalField(decimal_places = 2, max_digits = 10)