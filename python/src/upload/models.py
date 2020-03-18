from django.db import models

# Create your models here.

class Expense(models.Model):
    class Meta:
        db_table='Expenses'

    id = models.CharField(primary_key=True, max_length=25)
    employee_id = models.CharField(max_length=25, db_column="EmployeeId")

    date = models.DateTimeField()
    category = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    pre_tax_amount = models.DecimalField(max_digits=10, decimal_places=5, db_column="PreTaxAmount")
    tax_name = models.CharField(max_length=300,db_column="TaxName")
    tax_amount = models.DecimalField(max_digits=10, decimal_places=5, db_column="TaxAmount")

    #employee = models.ForeignKey(Employee)

class Employee(models.Model):
    class Meta:
        db_table="Employees"

    id = models.CharField(primary_key=True, max_length=25)
    name = models.CharField(max_length=300, unique=True)
    address = models.CharField(max_length=300)