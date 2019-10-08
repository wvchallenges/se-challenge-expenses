from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^data$', views.data, name='data'),
    url(r'^upload', views.upload, name='upload'),
    url(r'^monthly', views.monthly, name='monthly'),
]
