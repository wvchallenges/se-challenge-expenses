from django.test import TestCase

from django.urls import reverse

# Create your tests here.

class UploaderTests(TestCase):

    
    def test_upload_page_loads(self):
        '''
        Test that the uploader/upload.html page loads.
        '''
        response = self.client.get(reverse('uploader:upload'))
        self.assertEqual(response.status_code, 200)


    def test_totals_page_loads(self):
        '''
        Test that the uploader/totals.html page loads.
        '''
        response = self.client.get(reverse('uploader:totals'))
        self.assertEqual(response.status_code, 200)


    def test_parse_csv_view_redirects_for_no_file(self):
        '''
        Test that the parse_csv View redirects to the upload page
        when no input CSV was selected.
        '''
        response = self.client.post('/uploader/parse_csv')
        self.assertRedirects(response, '/uploader/upload')


    def test_parse_csv_view_redirects_on_get(self):
        '''
        Test that the /uploader/parse_csv is not directly accessible.
        '''
        response = self.client.get('/uploader/parse_csv')
        self.assertRedirects(response, '/uploader/upload')

        
