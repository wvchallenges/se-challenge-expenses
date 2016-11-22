from django.test import TestCase
from django.core.urlresolvers import resolve, reverse
from .views import homepage


class SmokeTest(TestCase):

    def test_basic_math(self):
        self.assertEqual(1 + 1, 2)


class HomepageTest(TestCase):

    def test_homepage_url_routing(self):
        route = resolve(reverse("homepage"))
        self.assertEqual(route.func, homepage)

    def test_homepage_template_loading(self):
        response = self.client.get(reverse("homepage"))
        self.assertTemplateUsed(response, "index.html")
