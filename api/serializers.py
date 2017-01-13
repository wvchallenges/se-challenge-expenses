from .models import Address, AddressType, Employee, EmployeeAddress, Expense, ExpenseCatagory, TaxCode
from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'username', 'password', 'first_name', 'last_name', 'email',)
        write_only_fields = ('password',)
        read_only_fields = ('is_staff', 'is_superuser', 'is_active', 'date_joined',)

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username'],
            first_name=validated_data['first_name'].strip(),
            last_name=validated_data['last_name'].strip()
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class EmployeeSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Employee
        fields = ('pk', 'username', 'created', 'updated', 'is_active')


class AddressTypeSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = AddressType
        fields = ('pk', 'address_type')


class AddressSerializer(serializers.HyperlinkedModelSerializer):
    address_type = serializers.SlugRelatedField(slug_field='pk',required=True,queryset=AddressType.objects.all().select_related())

    class Meta:
        model = Address
        fields = ('pk', 'line1', 'line2', 'country', 'state', 'city', 'postal_code', 'address_type')


class EmployeeAddressSerializer(serializers.HyperlinkedModelSerializer):
    address = serializers.SlugRelatedField(slug_field='pk',required=True,queryset=Address.objects.all().select_related('address_type'))
    employee = serializers.SlugRelatedField(slug_field='pk',required=True,queryset=Employee.objects.all().select_related())

    class Meta:
        model = EmployeeAddress
        fields = ('pk', 'address', 'employee')


class ExpenseCatagorySerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = ExpenseCatagory
        fields = ('pk', 'catagory')


class TaxCodeSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = TaxCode
        fields = ('pk', 'code', 'percentage')


class ExpenseSerializer(serializers.HyperlinkedModelSerializer):
    employee = serializers.SlugRelatedField(slug_field='pk',required=True,queryset=Employee.objects.all().select_related())
    expense_catagory = serializers.SlugRelatedField(slug_field='pk',required=True,queryset=ExpenseCatagory.objects.all().select_related())
    tax_code = serializers.SlugRelatedField(slug_field='pk',required=True,queryset=TaxCode.objects.all().select_related())

    class Meta:
        model = Expense
        fields = ('pk', 'employee', 'subtotal',  'total', 'date', 'expense_catagory', 'tax_code', 'created', 'updated', 'is_active')
