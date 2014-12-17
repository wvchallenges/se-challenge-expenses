from django.conf.urls import patterns, url

urlpatterns = patterns('expenses.views',
    url(r'^upload/$', 'upload', name='expense_upload'),
    url(r'^list/$', 'lst', name='expense_list'),
    url(r'^monthly_summary/$', 'monthly_summary', name='expense_monthly_summary'),
    url(r'^help/$', 'hlp', name='expense_help'),
)
