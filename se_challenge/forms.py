from django import forms


class ReportForm(forms.Form):

    # TODO: validate the file
    report = forms.FileField(help_text="Please select report file to process")
