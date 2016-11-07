from django.db import models
import datetime

'''
WvDateField - Class to convert date field format.
DJango exports date in 'YYYY-MM-DD' format. This class
coverts the same date to 'MM/DD/YYYY'
'''
class WvDateField(models.DateField):
    def get_prep_value(self,value):
        return datetime.datetime.strptime(value, '%m/%d/%Y').strftime('%Y-%m-%d')


class Expense(models.Model):
    expense_date = WvDateField(auto_now=False, auto_now_add=False)
    category = models.CharField(max_length=64)
    employee_name = models.CharField(max_length=128)
    employee_address = models.TextField()
    expense_description = models.CharField(max_length=256)
    pretax_amount = models.DecimalField(max_digits=7, decimal_places=2)
    tax_name = models.CharField(max_length=64)
    tax_amount = models.DecimalField(max_digits=7, decimal_places=2)

