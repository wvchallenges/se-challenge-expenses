from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.data_migrator_page, name='data_migrator_page'),
]