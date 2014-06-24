from django.test import TestCase
from datetime import datetime
from decimal import Decimal

from wavese.app.forms import UploadFileForm
from wavese.app.models import SubsidiaryData
from wavese.app.views import home, parse_company_data, report

class FormsTests(TestCase):

    def test_normal_case(self):
        """
        Normal case should pass
        """
        form = UploadFileForm('asdf')


    def test_bad_case(self):
        """
        Problematic case should fail
        """
        pass


class ModelsTests(TestCase):


    def test_normal_case(self):
        """
        Normal case should pass
        """
        model = SubsidiaryData(date=datetime.strptime("12/1/2013", '%m/%d/%Y').date(),
                               category="Travel",
                               employee_name="Don Draper",
                               employee_address="783 Park Ave, New York, NY 10021",
                               expense_description="Taxi ride",
                               pre_tax_amount=Decimal(" 350.00 ".strip().replace(',', '')),
                               tax_name="NY Sales tax",
                               tax_amount=Decimal("31.06".strip().replace(',', '')))

        self.assertEqual(model.date.__str__(), '2013-12-01')
        self.assertEqual(model.category, "Travel")
        self.assertEqual(model.employee_name, "Don Draper")
        self.assertEqual(model.employee_address, "783 Park Ave, New York, NY 10021")
        self.assertEqual(model.expense_description, "Taxi ride")
        self.assertEqual(model.pre_tax_amount, Decimal(350.00))
        self.assertEqual(model.tax_amount, Decimal('31.06'))
        self.assertEqual(model.tax_name, "NY Sales tax")


    def test_empty_case(self):
        """
        Empty constructor should return default values
        """
        model = SubsidiaryData()
        self.assertEqual(model.date, None)
        self.assertEqual(model.category, "")
        self.assertEqual(model.employee_address, "")
        self.assertEqual(model.employee_name, "")
        self.assertEqual(model.expense_description, "")
        self.assertEqual(model.pre_tax_amount, None)
        self.assertEqual(model.tax_amount, None)
        self.assertEqual(model.tax_name, "")

    def test_bad_case(self):
        """
        Problematic case should fail
        """
        pass


class ViewsTests(TestCase):

    def test_normal_case(self):
        """
        Normal case should pass
        """
        pass

    def test_bad_case(self):
        """
        Problematic case should fail
        """
        pass