from django import forms


class UploadDataFileForm(forms.Form):
    file = forms.FileField()
