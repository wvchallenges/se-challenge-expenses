from django import forms
from django.utils.translation import ugettext_lazy as _
from expense_utils import process_csv_file

class ExpenseUploadForm(forms.Form):

    csv_expense_file = forms.FileField(help_text=_('Upload Expenses using correct file format.'))

    def handle_uploaded_file(self, file):
        # send email using the self.cleaned_data dictionary
        process_csv_file(file)