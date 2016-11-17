from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'^', views.CSVMigrateView.as_view(), name="csv-migrate-form"),
]
