from django.contrib import admin
from manualimport.models import Expense, Employee, Tax, Category

admin.site.register(Expense)
admin.site.register(Employee)
admin.site.register(Tax)
admin.site.register(Category)
