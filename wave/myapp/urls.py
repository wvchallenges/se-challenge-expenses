# -*- coding: utf-8 -*-
from django.conf.urls import url
from wave.myapp.views import upload

urlpatterns = [
    url(r'^upload/$', upload, name='upload')
]
