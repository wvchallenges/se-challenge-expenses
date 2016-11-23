from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from datetime import datetime
from decimal import Decimal, InvalidOperation

from wavese.app.forms import UploadFileForm
from wavese.app.models import SubsidiaryData
from wavese.app.views import home, parse_company_data, report


class ModelsTests(TestCase):

    def test_normal_case(self):
        """
        Normal case should pass
        """
        model = SubsidiaryData(date=datetime.strptime("12/1/2013", '%m/%d/%Y').date(),
                               category="Travel",
                               employee_name="Don Draper",
                               employee_address="783 Park Ave, New York, NY 10021",
                               expense_description="Taxi ride",
                               pre_tax_amount=Decimal(" 350.00 ".strip().replace(',', '')),
                               tax_name="NY Sales tax",
                               tax_amount=Decimal("31.06".strip().replace(',', '')))

        self.assertEqual(model.date.__str__(), '2013-12-01')
        self.assertEqual(model.category, "Travel")
        self.assertEqual(model.employee_name, "Don Draper")
        self.assertEqual(model.employee_address, "783 Park Ave, New York, NY 10021")
        self.assertEqual(model.expense_description, "Taxi ride")
        self.assertEqual(model.pre_tax_amount, Decimal(350.00))
        self.assertEqual(model.tax_amount, Decimal('31.06'))
        self.assertEqual(model.tax_name, "NY Sales tax")

    def test_empty_case(self):
        """
        Empty constructor should return default values
        """
        model = SubsidiaryData()
        self.assertEqual(model.date, None)
        self.assertEqual(model.category, "")
        self.assertEqual(model.employee_address, "")
        self.assertEqual(model.employee_name, "")
        self.assertEqual(model.expense_description, "")
        self.assertEqual(model.pre_tax_amount, None)
        self.assertEqual(model.tax_amount, None)
        self.assertEqual(model.tax_name, "")


class ViewsTests(TestCase):

    def test_normal_get_home_page(self):
        """
        Normal GET for home page should result in the home HTML page and a 200 HTML code
        """
        response = self.client.get('/home/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'app/home.html')

    def test_normal_post_home_page(self):
        """
        Normal POST to home page should result in a valid form, and the report HTML page
        """
        upload_file = open('wavese/app/static/test/testNormalInput', 'rb')
        post_dict = {'title': 'Test Title'}
        file_dict = {'uploaded_file': SimpleUploadedFile(upload_file.name, upload_file.read())}
        form = UploadFileForm(post_dict, file_dict)
        response = self.client.post('/home/', file_dict)
        self.assertTrue(form.is_valid())
        self.assertRedirects(response, '/report/')

    def test_bad_post_home_page(self):
        """
        Bad POST to home page should result in a Form Error
        """
        response = self.client.post('/home/', {})
        self.assertFormError(response, 'form', 'uploaded_file', 'This field is required.')

    def test_normal_get_report_page(self):
        """
        Normal GET for report page should result in the report HTML page and a 200 HTML code
        """
        response = self.client.get('/report/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'app/report.html')

    def test_parse_normal_csv(self):
        try:
            file = open('wavese/app/static/test/testNormalInput', 'rb')
            parse_company_data(SimpleUploadedFile(file.name, file.read()))
        except Exception:
            self.fail("No errors should have been encountered")

    def test_parse_invalid_row_csv(self):
        """
        Parsing a file with an invalid row (not enough values) returns an IndexError
        """
        file = open('wavese/app/static/test/testInvalidRow', 'rb')
        self.assertRaises(IndexError, parse_company_data, SimpleUploadedFile(file.name, file.read()))

    def test_parse_invalid_date_csv(self):
        """
        Parsing a file with an invalid date returns a ValueError
        """
        file = open('wavese/app/static/test/testInvalidDate', 'rb')
        self.assertRaises(ValueError, parse_company_data, SimpleUploadedFile(file.name, file.read()))

    def test_parse_invalid_amount_csv(self):
        """
        Parsing a file with an invalid amount returns an InvalidOperation
        """
        file = open('wavese/app/static/test/testInvalidAmount', 'rb')
        self.assertRaises(InvalidOperation, parse_company_data, SimpleUploadedFile(file.name, file.read()))