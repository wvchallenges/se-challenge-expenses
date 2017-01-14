from django.db import models
import datetime

class Employee(models.Model):
    username = models.TextField(default='')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=False, auto_now=True)
    is_active =  models.BooleanField(default=True)

    class Meta:
        ordering = ('username',)


class AddressType(models.Model):
    address_type = models.TextField(default='')

    class Meta:
        ordering = ('pk',)


class Address(models.Model):
    line1 = models.TextField(default='')
    line2 = models.TextField(default='')
    country = models.TextField(default='')
    state = models.TextField(default='')
    city = models.TextField(default='')
    postal_code = models.TextField(default='')
    address_type = models.ForeignKey(AddressType, related_name='address')

    class Meta:
        ordering = ('pk',)


class EmployeeAddress(models.Model):
    address = models.ForeignKey(Address, related_name='employee_address')
    employee = models.ForeignKey(Employee, related_name='employee_address')

    class Meta:
        ordering = ('pk',)


class ExpenseCatagory(models.Model):
    catagory = models.TextField(default='')

    class Meta:
        ordering = ('pk',)


class TaxCode(models.Model):
    code = models.TextField(default='')
    percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)

    class Meta:
        ordering = ('pk',)


class Expense(models.Model):
    employee = models.ForeignKey(Employee, related_name='espense')
    subtotal = models.DecimalField(max_digits=20, decimal_places=2, default=0.00)
    total = models.DecimalField(max_digits=21, decimal_places=2, default=0.00)
    date = models.DateField(default=datetime.datetime.now())
    expense_catagory = models.ForeignKey(ExpenseCatagory, related_name='espense')
    tax_code = models.ForeignKey(TaxCode, related_name='espense')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=False, auto_now=True)
    is_active =  models.BooleanField(default=True)

    class Meta:
        ordering = ('employee',)
