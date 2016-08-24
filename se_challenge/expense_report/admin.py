from django.contrib import admin

from expense_report.models import (
    Category,
    ExpenseReport,
    Employee,
)


@admin.register(ExpenseReport)
class ExpenseReportAdmin(admin.ModelAdmin):
    pass


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    pass


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass
