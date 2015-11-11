
from django.db import models


class Employee(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)

    def __str__(self):
        return self.name

    @staticmethod
    def get_employee(name, address):
        if Employee.objects.filter(name=name).exists():
            return Employee.objects.get(name=name)
        else:
            employee_object = Employee(name=name, address=address)
            employee_object.save()
            return employee_object


class File(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Expenses(models.Model):
    upload_file = models.ForeignKey(File)
    date = models.DateField()
    category = models.CharField(max_length=200)
    employee = models.ForeignKey(Employee)
    expense_description = models.CharField(max_length=200)
    pre_tax_amount = models.DecimalField(max_digits=19, decimal_places=2)
    tax_name = models.CharField(max_length=200)
    tax_amount = models.DecimalField(max_digits=19, decimal_places=2)

    def __str__(self):
        return self.expense_description






















