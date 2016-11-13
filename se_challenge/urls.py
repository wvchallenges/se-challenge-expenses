"""se_challenge URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.views.generic.base import RedirectView

from .views import UploadView, ExpenseLiseView, NukeView

admin.autodiscover()

urlpatterns = [
    url(r'^expenses/$', ExpenseLiseView.as_view(), name='expense-list'),
    url(r'^upload/$', UploadView.as_view(), name='upload'),
    url(r'^clear/$', NukeView.as_view(), name='clear'),
    url(r'^admin/', admin.site.urls),
    url(r'^.*$', RedirectView.as_view(pattern_name='upload', permanent=False)),
]
