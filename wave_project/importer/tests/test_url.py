from django.core.urlresolvers import reverse
from django.test import SimpleTestCase


class UrlTestCase(SimpleTestCase):
    def test_urls(self):
        self.assertEqual('/import/csvimport/', reverse('csv_import_view'))
        self.assertEqual('/import/uploadsummary/1/', reverse('upload_summary_view', args={'1'}))
        self.assertEqual('/import/', reverse('home'))
