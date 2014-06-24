from django import forms


class UploadFileForm(forms.Form):
    """
    Form that accepts an uploaded file
    """
    uploaded_file = forms.FileField(label='')