from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.data_migrator_page, name='data_migrator_page'),
    url(r'upload_file$', views.upload_file, name='upload_file'),
    url(r'view_data$', views.view_data_page, name='view_data_page'),
]