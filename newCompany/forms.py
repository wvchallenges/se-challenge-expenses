from django import forms


class FileUploader(forms.Form):
    file = forms.FileField()
