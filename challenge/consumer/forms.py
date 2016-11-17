from django import forms


class CSVMigrateForm(forms.Form):
    csv_file = forms.FileField(label="CSV File")
