from django.contrib import admin
from .models import RawExpenseSheet, MonthlyExpense

admin.site.register(RawExpenseSheet)
admin.site.register(MonthlyExpense)
# Register your models here.
