from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.expense_upload, name='expense_upload'),
]