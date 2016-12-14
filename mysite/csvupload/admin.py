from django.contrib import admin
from .models import EmployeeExpenses


class EmployeeExpensesAdmin(admin.ModelAdmin):
    list_display = ('expense_description', 'date', 'category', 'employee_name',
                    'employee_address', 'pretax_amount', 'tax_name',
                    'tax_amount', 'created_on', 'updated_on')


admin.site.register(EmployeeExpenses, EmployeeExpensesAdmin)


# Register your models here.
