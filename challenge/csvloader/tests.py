from decimal import Decimal
from datetime import date

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase

from csvloader.forms import UploadForm
from csvloader.models import Import

User = get_user_model()


class ImportTests(TestCase):
    user = None
    def setUp(self):
        self.user = User.objects.create_user('importer', email='user@example.com', password='user')

    def check_valid_import(self, file_name):
        upload_file = open(settings.TEST_DATA_DIR + '/' + file_name, 'rb')
        post_dict = {}
        file_dict = {
            'imported_file': SimpleUploadedFile(upload_file.name, upload_file.read())
        }

        form = UploadForm(post_dict, file_dict)
        self.assertTrue(form.is_valid())
        imported = form.save(self.user)
        self.assertEqual(imported.expense_set.count(), 19)
        self.assertEqual(imported.total_pre_tax(), Decimal('8039'))
        self.assertEqual(imported.total_tax(), Decimal('635.24'))

        # Verify that the rows in the first row are as expected.
        exp = imported.expense_set.get(id=1)
        self.assertEqual(exp.date, date(2013, 12, 1))
        self.assertEqual(exp.category, 'Travel')
        self.assertEqual(exp.employee_name, 'Don Draper')
        self.assertEqual(exp.employee_address, "783 Park Ave, New York, NY 10021")
        self.assertEqual(exp.expense_description, 'Taxi ride')
        self.assertEqual(exp.pre_tax_amount, Decimal('350.00'))
        self.assertEqual(exp.tax.tax_name, 'NY Sales tax')
        self.assertEqual(exp.tax.tax_amount, Decimal('31.06'))

    def test_repo_data(self):
        """
        Test precisely the data from the repo.
        """
        self.check_valid_import('data_example.csv')

    def test_cleaned_data(self):
        """
        The example in the repo had spaces around the numbers (and thousands
        comma separators). Verify that if the numbers are not formatted in this
        manner, that the CSV would still correctly import.
        """
        self.check_valid_import('data_example_cleaned.csv')

    def check_invalid_import(self, file_name):
        upload_file = open(settings.TEST_DATA_DIR + '/' + file_name, 'rb')
        post_dict = {}
        file_dict = {
            'imported_file': SimpleUploadedFile(upload_file.name, upload_file.read())
        }

        form = UploadForm(post_dict, file_dict)
        self.assertFalse(form.is_valid())

    def test_typo_header_name(self):
        """
        The date column header also includes "testtest", so abort as clearly invalid.
        """
        self.check_invalid_import('bad_column.csv')

    def test_invalid_number(self):
        """
        Replace the tax value with the string test.
        """
        self.check_invalid_import('bad_number.csv')

    def test_other_date_format(self):
        # XXXX : If there is a mix of date formats, it should complain; but does not yet.
        #self.check_invalid_import('bad_date.csv')
        pass


    def test_missing_string(self):
        """
        If the tax name is missing, it should be graceful.
        """
        upload_file = open(settings.TEST_DATA_DIR + '/missing_tax_value.csv', 'rb')
        post_dict = {}
        file_dict = {
            'imported_file': SimpleUploadedFile(upload_file.name, upload_file.read())
        }

        form = UploadForm(post_dict, file_dict)
        self.assertTrue(form.is_valid())
        imported = form.save(self.user)
        row = imported.expense_set.get(id=1)
        self.assertEqual(row.tax.tax_name, 'not provided')

