from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^upload_results$', views.upload_results, name='upload_results'),
]