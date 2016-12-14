from django import forms


class EmployeeExpensesForm(forms.Form):
    csv_file = forms.FileField()

