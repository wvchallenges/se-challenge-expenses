import csv
from io import StringIO
from unittest import TestCase

from importer.csv_importer import CsvImporter


class TestCsvImporter(TestCase):
    def test_reading_successful(self):
        """
        Test the successful reading of CSV Line and have the record passed through to the Data Controller.
        The Data Controller is this TestCsvImporter class acting as a stub - it implements necessary 'public' method.

        Expected:
         - One record will be passed through to process_record method
         - self.process_record_call is True
         - self.start_import_called is True
        """

        input_text = StringIO()
        input_text.write(
            u'date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount\n')
        input_text.write(
            u'12/1/2013,Travel,Don Draper,"783 Park Ave, New York, NY 10021",Taxi ride, 350.00 ,NY Sales tax, 31.06\n')

        input_text.seek(0)

        dialect = csv.Sniffer().sniff(sample=input_text.getvalue())
        dialect.delimiter = ','
        dialect.quotechar = '"'

        csv_importer = CsvImporter(data_controller=self)
        actual_return = csv_importer.import_data(input_text)
        self.assertEqual(self.upload_id, actual_return)

        self.assertTrue(self.process_record_call)
        self.assertTrue(self.start_import_called)

    @property
    def upload_id(self):
        return 1

    def process_record(self, row):
        """
        The row that has been extract from the CSV Input object.
        Set process_record_call to true for assertion

        :param row: list
        """

        expected = {'category': 'Travel', 'expense description': 'Taxi ride', 'tax amount': ' 31.06',
                    'tax name': 'NY Sales tax', 'pre-tax amount': ' 350.00 ',
                    'employee address': '783 Park Ave, New York, NY 10021', 'date': '12/1/2013',
                    'employee name': 'Don Draper'}

        self.assertEqual(expected, row)
        self.process_record_call = True

    def start_import(self):
        self.start_import_called = True
