from django.test import TestCase

from io import BytesIO

DATA_EXAMPLE = '../data_example.csv'


def load_sample():
    csv_data = BytesIO(open(DATA_EXAMPLE, 'rb').read())
    csv_data.name = 'testfile.csv'
    return csv_data


class ChallengeTestCase(TestCase):

    def test_submitting_csv_file_redirect(self):
        out = self.client.post('/', {'csv_file': load_sample()})
        self.assertEqual(out.url, 'http://testserver/total')

    def test_submitting_csv_processing(self):
        out = self.client.post('/', {'csv_file': load_sample()})
        import ipdb; ipdb.set_trace()