from django.conf.urls import url

from . import views


urlpatterns = [
    url(r"^list/$", views.MonthlyExpenseListView.as_view(), name="monthly-expense-list"),
    url(r"^", views.CSVMigrateFormView.as_view(), name="csv-migrate-form"),
]
