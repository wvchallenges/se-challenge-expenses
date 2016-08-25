from django import forms
from django.forms import ModelForm

from expense_report.models import Category, ExpenseReport, Employee


class ExpenseCSVUploadForm(forms.Form):
    expense_file = forms.FileField(label='Expense File', required=True)

    def clean_expense_file(self):
        cleaned_data = self.cleaned_data['expense_file']

        # Basic validation to check for csv file extension.
        if not cleaned_data.name.endswith('.csv'):
            self.add_error('expense_file', 'Please, upload a csv file')

        return cleaned_data


class ExpenseReportForm(ModelForm):
    class Meta:
        model = ExpenseReport
        fields = [
            'date',
            'category',
            'expense_description',
            'pre_tax_amount',
            'tax_name',
            'tax_amount',
            'employee',
        ]


class EmployeeForm(ModelForm):
    class Meta:
        model = Employee
        fields = ['name', 'address']


class CategoryForm(ModelForm):
    class Meta:
        model = Category
        fields = ['name']
