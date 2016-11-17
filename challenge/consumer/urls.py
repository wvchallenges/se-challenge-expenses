from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'^list/$', views.ExpenseListView.as_view(), name="expense-list"),
    url(r'^', views.CSVMigrateFormView.as_view(), name="csv-migrate-form"),
]
