from django.contrib import admin

from consume.models import Expense, Tax, Employee, Category, CSVFile


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'date',
        'category',
        'employee',
        'description',
        'pre_tax_amount',
        'tax',
        'tax_amount'
    )


@admin.register(Tax)
class TaxAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
    )


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'address',
    )


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
    )


@admin.register(CSVFile)
class FileAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'filename',
    )
