from django.conf.urls import include, url
from django.views.generic.base import RedirectView

urlpatterns = [
    url(r'^expenses/', include('expenses.urls')),
    url(r'^.*$', RedirectView.as_view(url='/expenses/', permanent=False)),
]
