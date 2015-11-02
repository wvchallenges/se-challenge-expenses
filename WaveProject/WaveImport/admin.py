from django.contrib import admin
from django import forms

from .models import Employee, Expense, Tax, Category, CSVDocument, BatchPeriod
from .forms import CSVDocForm, BatchPeriodForm

class BatchPeriodAdmin(admin.ModelAdmin):
    form = BatchPeriodForm
    list_display = ('monthyear','total')
    
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('date', 'category', 'employee', 'total', 'expense_desc')
    list_filter = ['category', 'employee']
    search_fields = ['category__category_text', 'expense_desc']

class BatchPeriodInLine(admin.TabularInline):
    form = BatchPeriodForm
    model = BatchPeriod
    list_display = ('monthyear', 'total')
    extra = 0
    def has_add_permission(self, request):
        return False
#       
#     def has_change_permission(self, request, obj=None):
#         return False
     
    def has_delete_permission(self, request, obj=None):
        return False
     
class CSVDocAdmin(admin.ModelAdmin):
    form = CSVDocForm
    list_display = ('note', 'docfile')
    inlines = [BatchPeriodInLine]
    
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('employee_name','employee_address')

class TaxAdmin(admin.ModelAdmin):
    list_display = ('tax_text', 'tax_percent')

admin.AdminSite.site_header = 'WaveImport Administration'
admin.site.register(Employee, EmployeeAdmin)
admin.site.register(BatchPeriod, BatchPeriodAdmin)
admin.site.register(Expense, ExpenseAdmin)
admin.site.register(Tax, TaxAdmin)
admin.site.register(Category)
admin.site.register(CSVDocument, CSVDocAdmin)