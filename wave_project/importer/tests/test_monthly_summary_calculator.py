import datetime
from decimal import Decimal

from django.test import TestCase

from importer.models import ImportLog
from importer.summary_calculator import MonthlySummaryCalculator
from importer.tests.test_data import load_test_data


class TestMonthlySummaryCalculator(TestCase):
    def setUp(self):
        load_test_data()

    def test_calculate_summary(self):
        """
        Test the month summaries are calculated correctly for one ImportLog ( the first entered PK=1)

        :return:
        """

        import_log = ImportLog.objects.get(pk=1)
        actual_monthly_amounts = MonthlySummaryCalculator().calculate_summary(import_log_query_set=import_log)

        self.assertEqual(3, len(actual_monthly_amounts))

        self.check_summary_record(actual_monthly_amounts[0], expected_date=datetime.date(2014, 1, 1),
                                  expected_tax_amount=Decimal('13.00'), expected_pre_tax_amount=Decimal('100.00'),
                                  expected_total_amount=Decimal('113.00'))

        self.check_summary_record(actual_monthly_amounts[1], expected_date=datetime.date(2014, 3, 1),
                                  expected_tax_amount=Decimal('32.5'), expected_pre_tax_amount=Decimal('250.00'),
                                  expected_total_amount=Decimal('282.5'))

        self.check_summary_record(actual_monthly_amounts[2], expected_date=datetime.date(2015, 3, 1),
                                  expected_tax_amount=Decimal('6.5'), expected_pre_tax_amount=Decimal('50.0'),
                                  expected_total_amount=Decimal('56.5'))


    def check_summary_record(self, actual_expense_summary, expected_date, expected_pre_tax_amount, expected_tax_amount,
                             expected_total_amount):
        """

        :type actual_expense_summary: ExpenseSummary
        """
        self.assertEqual(expected_date, actual_expense_summary.date)
        self.assertEqual(expected_pre_tax_amount, actual_expense_summary.pre_tax_amount)
        self.assertEqual(expected_tax_amount, actual_expense_summary.tax_amount)
        self.assertEqual(expected_total_amount, actual_expense_summary.total_amount)


