from django import forms


class CSVUpload(forms.Form):
    csv_file = forms.FileField(label="Select a CSV file")
