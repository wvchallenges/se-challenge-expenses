from decimal import Decimal
import os
import tempfile

from django.core.urlresolvers import reverse
from django.test import Client, TestCase

from importer.models import ImportLog, ExpenseItem
from importer.tests.test_data import load_test_data


class BaseTestCase(TestCase):
    def send_file_upload_request(self, view_name, filename, expected_response_code=200):
        """
        Convenience method for uploading a file to a view

        :param str view_name:   name of view to reverse into an URL
        :param str filename:    the filename to be uploaded
        :param int expected_response_code:  expected response code
        :return: Response object
        """
        url = reverse(view_name)

        client = Client()
        with open(filename) as file_upload:
            response = client.post(path=url, data={'file': file_upload})

        self.assertEqual(expected_response_code, response.status_code)

        return response

    def send_request(self, view_name, params=None, expected_response_code=200):
        """
        Convenience method to send a GET Request to a View.

        :param base string view_name:   name of view to reverse into an URL
        :param dict params:      the GET parameters
        :param int expected_response_code: the expected response code
        :return: the Response object
        """

        url = reverse(viewname=view_name, kwargs=params)

        client = Client()
        response = client.get(path=url, data=params)

        self.assertEqual(expected_response_code, response.status_code)

        return response


class TestCsvImportView(BaseTestCase):
    def test_file_upload(self):
        """
        Integration Test of a successful File Upload View and CVS persistence.

        Expected -
            - data is written to the DB ( brief test )
            - redirection response code ( 302 )
            - URL redirection will be to the named URL 'upload_summary_view' with the PK of the ImportLog

        :return:
        """

        with tempfile.NamedTemporaryFile() as test_file:
            test_file.write(
                u'date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount\n')
            test_file.write(
                u'12/1/2013,Travel,Don Draper,"783 Park Ave, New York, NY 10021",Taxi ride, 350.00 ,NY Sales tax, 31.06\n')
            test_file.flush()
            response = self.send_file_upload_request(view_name='csv_import_view', filename=test_file.name)

        actual_import_logs = ImportLog.objects.all()
        self.assertEqual(1, len(actual_import_logs))

        actual_import_log = actual_import_logs[0]
        expected_file_name = os.path.basename(test_file.name)
        self.assertEqual(expected_file_name, actual_import_log.file_name)

        expense_items = ExpenseItem.objects.all()
        self.assertEqual(1, len(expense_items))
        self.assertEqual('Don Draper', expense_items[0].employee.name)

        self.assertEqual('{"upload_id": 1}', response.content)


class TestUploadSummaryView(BaseTestCase):
    def setUp(self):
        load_test_data()

    def test_summary_success(self):
        """
        A Success path of retrieving summary data.

        Expected:
            - 3 summary items are returned
            - first pre tax amount is 100 ( don't test entire data - other unit tests do this )
        :return:
        """

        summary_data_key = 'summary_data'

        response = self.send_request(view_name='upload_summary_view', params={'upload_id': 1})
        context_data = response.context_data
        self.assertTrue(summary_data_key in context_data)

        summary_data = context_data[summary_data_key]
        self.assertEquals(3, len(summary_data))

        self.assertEqual(Decimal('100.0'), summary_data[0].pre_tax_amount)




