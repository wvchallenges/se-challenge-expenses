from django.test import TestCase


class DashboardViewsTestCase(TestCase):

    def test_form(self):
        resp = self.client.get('/manual-import/')
        self.assertEqual(resp.status_code, 200)
        self.assertTrue("form" in resp.context)

    def test_index(self):
        resp = self.client.get('/manual-import/index')
        self.assertEqual(resp.status_code, 200)
