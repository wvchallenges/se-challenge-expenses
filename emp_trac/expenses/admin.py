from django.contrib import admin

# Register your models here.

from .models import Expense


class ExpenseAdmin(admin.ModelAdmin):

    model = Expense
    list_display = ['employee', 'description', 'category', 'formatted_amount', 'formatted_tax', 'tax_amount', 'total_amount']

admin.site.register(Expense, ExpenseAdmin)