from django.db import models

class Employee(models.Model):
    employee_name       = models.CharField(max_length=255)
    employee_address    = models.CharField(max_length=512)

class ExpenseCategory(models.Model):
    category_name       = models.CharField(max_length=255)

class TaxName(models.Model):
    tax_name            = models.CharField(max_length=255)

class EmployeeExpenseModel(models.Model):
    # ForeignKey fields
    employee            = models.ForeignKey('data_migrator.Employee')
    expense_category    = models.ForeignKey('data_migrator.ExpenseCategory')

    # Date variables
    created_date        = models.DateTimeField(auto_now_add=True)
    expense_date        = models.DateTimeField()

    # Float fields
    pre_tax_amount      = models.DecimalField(max_digits=10, decimal_places=2)
    tax_amount          = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Char fields
    expense_discription = models.CharField(max_length=1024)
    tax_name            = models.CharField(max_length=255)