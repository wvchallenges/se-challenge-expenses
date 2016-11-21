from django.core.urlresolvers import reverse, resolve
from django.test import TestCase
from .views import upload, detail
from .models import Expense, ExpenseReport
from .forms import ExpenseReportForm
from unittest import skip
from datetime import date
from django.conf import settings
import os


class ExpenseImportTest(TestCase):

    def test_expense_report_upload_url_routing(self):
        route = resolve(reverse("expense_reports:upload"))
        self.assertEqual(route.func, upload)

    def test_expense_report_detail_url_routing(self):
        route = resolve(reverse("expense_reports:detail", args=[1]))
        self.assertEqual(route.func, detail)

    def test_expense_report_detail_template_loading(self):
        response = self.client.get(reverse("expense_reports:detail", args=[1]))
        self.assertTemplateUsed(response, "expense_reports/detail.html")

    @skip
    def test_redirect_to_detail_upon_successful_upload(self):
        response = self.client.post(
            reverse("expense_reports:upload"),
            follow=True
        )
        self.assertRedirects(
            response,
            reverse("expense_reports:detail", args=[1])
        )

    def test_redirect_to_homepage_upon_unsuccessful_upload(self):
        response = self.client.post(
            reverse("expense_reports:upload"),
            follow=True
        )
        self.assertRedirects(
            response,
            reverse("homepage")
        )

    def test_expense_model_creation(self):
        expense = Expense.objects.create(
            date=date.today(),
            category="a category",
            employee_name="First Name, Last Name",
            employee_address="123 Fake Street, Falsehood ON H0H0H0",
            expense_description="Expensive",
            pretax_amount=20.00,
            tax_name="Some Tax",
            tax_amount=2.00
        )
        self.assertTrue(isinstance(expense, Expense))

    def test_report_model_creation(self):
        expense_report = ExpenseReport.objects.create()
        self.assertTrue(isinstance(expense_report, ExpenseReport))

    def test_report_upload_form_forces_file_upload(self):
        expense_report_form = ExpenseReportForm()
        self.assertTrue(not expense_report_form.is_valid())

    def test_expense_upload_form_in_homepage_context(self):
        response = self.client.get(reverse("homepage"))
        self.assertTrue("form" in response.context)
