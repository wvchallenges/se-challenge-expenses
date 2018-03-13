from rest_framework import routers, serializers, viewsets
from expenses.models import Expense, FileUpload

class ExpenseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Expense
        fields = ('date','category','employee_name','employee_address','expense_description','pre_tax_amount','tax_name','tax_amount')


class FileUploadSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FileUpload
        fields = ('datafile',)