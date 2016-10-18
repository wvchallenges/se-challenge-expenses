from django import forms


class ExpenseForm(forms.Form):
    expfile = forms.FileField(
        label='Select a file to upload'
    )
