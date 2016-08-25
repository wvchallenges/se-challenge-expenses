from django.conf.urls import url

from expense_report.views import (
    EmptyExpenseList,
    ExpenseReportByMonth,
    ExpenseReportUpload,
    ExpenseReportList,
)

urlpatterns = [
    url(r'^$', ExpenseReportUpload.as_view(), name='expense-report'),
    url(r'^expense-list/$', ExpenseReportList.as_view(), name='expense-list'),
    url(r'^empty-expense-list/$', EmptyExpenseList.as_view(), name='empty-expense-list'),
    url(r'^expense-report-by-month/$', ExpenseReportByMonth.as_view(), name='expense-report-by-month'),
]
