from django.contrib import admin
from .models import Employee
from .models import Expense
from .models import TaxType
from .models import Category
# Register your models here.


admin.site.register(Employee)
admin.site.register(Expense)
admin.site.register(TaxType)
admin.site.register(Category)