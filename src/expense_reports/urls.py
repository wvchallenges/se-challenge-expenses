from django.conf.urls import url
from .views import upload, detail

urlpatterns = [
    url(r'^(?P<expense_report>\d+)/$', detail, name="detail"),
    url(r'^$', upload, name="upload"),
]
