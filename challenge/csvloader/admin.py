from django.contrib import admin

from csvloader.models import Expense


class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('date', 'category', 'employee_name', 'expense_description',
        'pre_tax_amount', 'tax_name', 'tax_amount',)
    list_filter = ('category', 'employee_name', 'tax_name',)

admin.site.register(Expense, ExpenseAdmin)
