from django.contrib import admin

from .models import Employees, ExpenseCategories, TaxInformation, Expenses

admin.site.register(Employees)
admin.site.register(ExpenseCategories)
admin.site.register(TaxInformation)
admin.site.register(Expenses)
