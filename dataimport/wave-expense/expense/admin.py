from django.contrib import admin

from .models import Expense, Category, Employee

admin.site.register(Expense)
admin.site.register(Category)
admin.site.register(Employee)

