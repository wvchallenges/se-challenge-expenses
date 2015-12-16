from django import forms


class CsvForm(forms.Form):
    csvfile = forms.FileField()
