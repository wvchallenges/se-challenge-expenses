from .serializers import AddressSerializer, AddressTypeSerializer, EmployeeSerializer, EmployeeAddressSerializer, ExpenseSerializer, ExpenseCatagorySerializer, TaxCodeSerializer, UserSerializer
from .models import Address, AddressType, Employee, EmployeeAddress, Expense, ExpenseCatagory, TaxCode
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import detail_route, list_route
from django.db.models.functions import TruncMonth
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.views import APIView
from django.views.generic import View
from rest_framework import status
from django.db.models import Sum
import json


class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser,)

    def post(self, request, format=None):
        my_file = request.data['datafile']
        filename = '/webapps/wave-test1/upload/expenses.csv'
        with open(filename, 'wb+') as temp_file:
            for chunk in my_file.chunks():
                temp_file.write(chunk)

        my_saved_file = open(filename) #there you go
        return Response({},status=status.HTTP_201_CREATED)

    def generic_create(self, serializer_type, data):
        generic_serializer = None
        if serializer_type == "expense":
            generic_serializer = ExpenseSerializer(data=data,many=True)
        elif serializer_type == "expense_catagory":
            generic_serializer = ExpenseCatagorySerializer(data=data,many=True)
        elif serializer_type == "address":
            generic_serializer = AddressSerializer(data=data,many=True)
        elif serializer_type == "tax_code":
            generic_serializer = TaxCodeSerializer(data=data,many=True)
        elif serializer_type == "employee":
            generic_serializer = EmployeeSerializer(data=data,many=True)
        elif serializer_type == "employee_address":
            generic_serializer = EmployeeAddressSerializer(data=data,many=True)
        print (generic_serializer)
        try:
            print(generic_serializer.is_valid(raise_exception=True))
            generic_serializer.save()
        except Exception as ex:
            print ("WE HAVE AN EXCEPTION")
            print (str(ex))
        return generic_serializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all().select_related()
    model = Employee
    serializer_class = EmployeeSerializer

   
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all().select_related('local_user')
    model = Employee
    serializer_class = EmployeeSerializer
    permission_classes = ()


class AddressTypeViewSet(viewsets.ModelViewSet):
    queryset = AddressType.objects.all().select_related()
    model = AddressType
    serializer_class = AddressTypeSerializer
    permission_classes = ()


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all().select_related('address_type')
    model = Address
    serializer_class = AddressSerializer
    permission_classes = ()


class EmployeeAddressViewSet(viewsets.ModelViewSet):
    queryset = EmployeeAddress.objects.all().select_related('employee', 'address')
    model = EmployeeAddress
    serializer_class = EmployeeAddressSerializer
    permission_classes = ()


class ExpenseCatagoryViewSet(viewsets.ModelViewSet):
    queryset = ExpenseCatagory.objects.all().select_related()
    model = ExpenseCatagory
    serializer_class = ExpenseCatagorySerializer
    permission_classes = ()


class TaxCodeViewSet(viewsets.ModelViewSet):
    queryset = TaxCode.objects.all().select_related()
    model = TaxCode
    serializer_class = TaxCodeSerializer
    permission_classes = ()


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all().select_related('expense_catagory', 'tax_code', 'employee')
    model = Expense
    serializer_class = ExpenseSerializer
    permission_classes = ()

