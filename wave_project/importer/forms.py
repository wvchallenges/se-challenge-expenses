from django.forms import forms


class UploadFileForm(forms.Form):
    file = forms.FileField()
