from django.test import TestCase

from io import BytesIO

from .logic import process_record
from .models import Employee, Expense

DATA_EXAMPLE = '../data_example.csv'

RECORD_EXAMPLE_1 = [
    '12/1/2013',
    'Travel',
    'Don Draper',
    '783 Park Ave, New York, NY 10021',
    'Taxi ride',
    '350.00',
    'NY Sales tax',
    '31.06'
]

RECORD_EXAMPLE_2 = [
    '11/10/2013',
    'Computer - Hardware',
    'Linus Torvalds',
    '123 Unicycle Ln, Portland, OR 97201',
    'MakerBot 3D printer',
    '2000.00',
    'OR Sales tax',
    '00.00',
]

RECORD_EXAMPLE_3 = [
    '12/10/2013',
    'Computer - Hardware',
    'Linus Torvalds',
    '123 Unicycle Ln, Portland, OR 97201',
    'PLA Fillament (1kg), Blue',
    '30.00',
    'OR Sales tax',
    '00.00',
]


def load_sample():
    csv_data = BytesIO(open(DATA_EXAMPLE, 'rb').read())
    csv_data.name = 'testfile.csv'
    return csv_data


class IntegrationTestCase(TestCase):

    def test_submitting_csv_file_redirect(self):
        """
        Upload & redirect works
        """
        out = self.client.post('/', {'csv_file': load_sample()})
        self.assertEqual(out.url, 'http://testserver/total')

    def test_submitting_csv_processing(self):
        """
        Uploaded data is present for an employee and an expense
        """
        self.client.post('/', {'csv_file': load_sample()})
        emp = Employee.objects.filter(name='Don Draper')
        self.assertEqual(emp[0].name, 'Don Draper')
        exp = Expense.objects.filter(pre_tax=350.00)
        self.assertTrue(exp)
        self.assertEqual(exp[0].tax_amount, 31.06)

    def test_file_recent_data_flag(self):
        """
        recent_data flag is set to true on init
        recent_data flag is set to False on next update_db invocation
        """
        process_record(RECORD_EXAMPLE_2)
        exp = Expense.objects.filter(recent_data=True)
        self.assertEqual(exp[0].employee.name, 'Linus Torvalds')
        self.client.post('/', {'csv_file': load_sample()})
        exp = Expense.objects.filter(recent_data=False)
        self.assertEqual(exp[0].employee.name, 'Linus Torvalds')


class LogicTestCase(TestCase):

    def test_process_record_no_entries_new_employee(self):
        process_record(RECORD_EXAMPLE_1)
        self.assertEqual(len(Employee.objects.all()), 1)
        emp = Employee.objects.filter(name='Don Draper')
        self.assertEqual(emp[0].name, 'Don Draper')

    def test_process_record_no_entries_new_entry(self):
        process_record(RECORD_EXAMPLE_1)
        self.assertEqual(len(Expense.objects.all()), 1)
        exp = Expense.objects.all()[0]
        self.assertEqual(exp.description, 'Taxi ride')

    def test_process_multiple_records_single_employee(self):
        process_record(RECORD_EXAMPLE_2)
        process_record(RECORD_EXAMPLE_3)
        self.assertEqual(len(Employee.objects.all()), 1)
        self.assertEqual(len(Expense.objects.all()), 2)
