from django.conf.urls import patterns, url


urlpatterns = patterns(
    'challenge.expenses.views',
    url(r'^upload/$', 'upload', name='expenses_upload'),
    url(r'^reports/$', 'list', name='expenses_list'),
    url(r'^reports/(\d+)/$', 'report', name='expenses_report'),
)
