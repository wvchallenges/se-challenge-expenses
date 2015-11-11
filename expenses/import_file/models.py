
from django.db import models
from django.db.models import Sum


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

    @staticmethod
    def get_monthly_expenses(file_id):
        file_object = File.objects.filter(id=file_id)
        dates = Expenses.objects.filter(upload_file=file_object).dates('date', 'month')
        monthly_expenses_dict = {}
        for date in dates:
            amount_dict = Expenses.objects.filter(upload_file=file_object, date__month=date.month, date__year=date.year).aggregate(Sum('tax_amount'), Sum('pre_tax_amount'))
            tax_amount = amount_dict['tax_amount__sum']
            pre_tax_amount = amount_dict['pre_tax_amount__sum']
            monthly_expenses_dict.update({date: pre_tax_amount + tax_amount})
        return monthly_expenses_dict























