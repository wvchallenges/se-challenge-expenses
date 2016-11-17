from django.conf import settings
from django.test import TestCase

from . import models as consumer
from .migrator import CSVMigrator


SAMPLE_DATA = settings.BASE_DIR + "/../data_example.csv"


class CSVMigratorTests(TestCase):
    """ Exercises the expected behaviour of CSVMigrator. """
    def setUp(self):
        self.sample_csv = open(SAMPLE_DATA, 'rb')
        self.migrator = CSVMigrator(self.sample_csv)
        self.migrator.migrate()

    def test_employee_created(self):
        """ Should create an employee named 'Steve Jobs'. """
        steve_jobs = consumer.Employee.objects.get(name="Steve Jobs")

    def test_category_created(self):
        """ Should create an expense category named 'Travel'. """
        travel = consumer.ExpenseCategory.objects.get(name="Travel")

    def test_subcategory_created(self):
        """ Should create an expense category named 'Computer' and subcategory 'Hardware'. """
        computer_hardware = consumer.ExpenseCategory.objects.get(name="Computer", subcategory="Hardware")

    def test_expense_created(self):
        """ Should create an expense with the description 'Paper' for $200.00 on 2013-09-30, with Canadian taxes worth $15.00. """
        paper = consumer.Expense.objects.get(description="Paper", pretax_amount="200.00", charged_on="2013-09-30",
                                             tax_name="CA Sales tax", tax_amount="15.00")

    def test_expense_count(self):
        """ Should have a total of expenses equal to the sample size. """
        with open(SAMPLE_DATA, 'rb') as sample:
            sample_size = len(sample.readlines()) - 1  # Exclude the header row from the size
        expense_count = consumer.Expense.objects.count()
        self.assertEqual(sample_size, expense_count)
