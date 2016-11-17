from django.conf import settings
from django.test import TestCase

from . import models as consumer
from .migrator import CSVMigrator


SAMPLE_DATA = settings.BASE_DIR + "/../data_example.csv"


class CSVMigratorTests(TestCase):
    """ Exercises the expected behaviour of CSVMigrator. """
    def setUp(self):
        sample_csv = open(SAMPLE_DATA, 'rb')
        self.migrator = CSVMigrator(sample_csv)

    def test_employee_created(self):
        """ Should create an employee named Steve Jobs. """
        self.migrator.migrate()
        steve_jobs = consumer.Employee.objects.get(name="Steve Jobs")
