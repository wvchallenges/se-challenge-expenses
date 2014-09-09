import csv

from django import forms

from csvloader.models import Import, Expense

class UploadForm(forms.Form):
    imported_file = forms.FileField()
    columns = [
        'date',
        'category',
        'employee name',
        'employee address',
        'expense description',
        'pre-tax amount',
        'tax name',
        'tax amount'
    ]

    def clean_imported_file(self):
        # XXXX: Use csv.Sniffer to do cursory checks.
        reader = csv.reader(self.cleaned_data.get('imported_file'))
        header_row = next(reader, [])

        if header_row != self.columns:
            raise forms.ValidationError(
                'Unexpected header columns. Expected %s, got %s' % 
                    (', '.join(self.columns), ', '.join(header_row),)
            )

        for row in reader:
            if not Expense.check_row(row):
                self.add_error(
                    'imported_file',
                    'Cannot import %s' % ', '.join(row)
                )

        return self.cleaned_data.get('imported_file')


    def save(self, user):
        with self.cleaned_data.get('imported_file') as csv_data:
            csv_data.seek(0)
            raw_data = csv_data.read()

            imported = Import(
                imported_by=user,
                raw_data=raw_data
            )
            imported.save()

            csv_data.seek(0)
            reader = csv.reader(csv_data)
            header_row = next(reader, [])
            for row in reader:
                Expense.import_row(imported, row)

            return imported
