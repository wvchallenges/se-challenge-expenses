from django.test import TestCase

from io import BytesIO

DATA_EXAMPLE = '../data_example.csv'


class ChallengeTestCase(TestCase):

    def test_submitting_csv_file(self):
        csv_data = BytesIO(open(DATA_EXAMPLE, 'rb').read())
        csv_data.name = 'testfile.csv'
        out = self.client.post('/', {'csv_file': csv_data})
        self.assertEqual(out.url, 'http://testserver/total')
