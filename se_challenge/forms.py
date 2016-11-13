from django import forms

from .models import Report, Expense


class ReportForm(forms.ModelForm):


    # TODO: validate the file
    # report = forms.FileField(help_text="Please select report file to process")

    class Meta:
        model = Report
        fields = ('report_file',)


class ExpenseForm(forms.ModelForm):

    class Meta:
        model = Expense
        fields = ('date', 'category', 'employee', 'employee_address', 'description', 'pre_tax', 'tax_name', 'tax',
                  'report')
