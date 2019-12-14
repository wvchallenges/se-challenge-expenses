from django import forms


class UploadForm(forms.Form):
    expenses_file = forms.FileField(required=True)
