from django.core.urlresolvers import reverse, resolve
from django.test import TestCase
from .views import upload, detail


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

    def test_redirect_to_detail_upon_upload(self):
        response = self.client.post(
            reverse("expense_reports:upload"),
            follow=True
        )
        self.assertRedirects(
            response,
            reverse("expense_reports:detail", args=[1])
        )
