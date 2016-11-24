from django.test import TestCase, Client
from .forms import UploadFileForm
from django.core.files.uploadedfile import SimpleUploadedFile
import os
import csv


# Unit testing passing data (as dictionary) for easy unit testing
# class TestDateFormat(TestCase):

#     def test_well_formed_csv(self):
#         #t = SimpleUploadedFile(upload_file_path, "file", content_type="text/csv")
#         #self.client.post(reverse('upload:list_files'), {'t': t})
#         #with open(upload_file_path) as f:
#         #    reader = csv.reader(f)
#         #    for row in reader:
#         #        print(row)
#         #suf = SimpleUploadedFile("data_example.csv", upload_file_path.read())
#         #file_dict = {'docfile': SimpleUploadedFile(upload_file.name, upload_file.read())}
#         #form = UploadFileForm(file_dict)
#         #self.assertTrue(form.is_valid())
#         self.assertTrue(True)
