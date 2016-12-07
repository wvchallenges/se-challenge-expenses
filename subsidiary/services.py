from datetime import datetime
from decimal import Decimal
from .models import *
import collections

def clear_database():
    Expense.objects.all().delete()
    Employee.objects.all().delete()
    Category.objects.all().delete()
    Tax.objects.all().delete()
    
def get_months():
    return ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

def get_monthly_expenses():
    expenses = Expense.objects.order_by('expense_date')
    result = collections.OrderedDict()
    for expense in expenses:
        year = expense.expense_date.year
        month = expense.expense_date.month
    
        if (year not in result):
            result[year] = [0]*12
            
        result[year][month-1] += expense.pretax_amount + expense.tax_amount
        
    return result