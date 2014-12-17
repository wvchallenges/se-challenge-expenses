from django.test import TestCase

from io import BytesIO

from .logic import process_record

from .models import Employee
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


def load_sample():
    csv_data = BytesIO(open(DATA_EXAMPLE, 'rb').read())
    csv_data.name = 'testfile.csv'
    return csv_data


class ChallengeTestCase(TestCase):
    '''
    def test_submitting_csv_file_redirect(self):
        out = self.client.post('/', {'csv_file': load_sample()})
        self.assertEqual(out.url, 'http://testserver/total')

    def test_submitting_csv_processing(self):
        out = self.client.post('/', {'csv_file': load_sample()})
        import ipdb; ipdb.set_trace()
    '''


class LogicTestCase(TestCase):

    def test_process_record_no_entries_new_employee(self):
        process_record(RECORD_EXAMPLE_1)
        self.assertEqual(len(Employee.objects.all()), 1)
        emp = Employee.objects.filter(name='Don Draper')
        self.assertEqual(emp[0].name, 'Don Draper')

