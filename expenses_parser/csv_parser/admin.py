from django.contrib import admin
from .models import Employee, Expense

class EmployeeAdmin(admin.ModelAdmin):
  list_display = ('name', 'address')
  search_fields = ('name', 'address')

class ExpenseAdmin(admin.ModelAdmin):
  list_display = ('date','description','pre_tax_amount','tax_name','tax_amount','employee')
  date_hierarchy = 'date'

admin.site.register(Employee)
admin.site.register(Expense)
