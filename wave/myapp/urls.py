# -*- coding: utf-8 -*-
from django.conf.urls import url
from wave.myapp.views import list

urlpatterns = [
    url(r'^list/$', list, name='list')
]
