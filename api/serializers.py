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

    def create(self, validated_data):
        employee = Employee.objects.filter(**validated_data)
        if len(employee):
            return employee[0]
        employee_obj = Employee.objects.create(**validated_data)
        employee_obj.save()
        return employee_obj


class AddressTypeSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = AddressType
        fields = ('pk', 'address_type')

    def create(self, validated_data):
        address_type = AddressType.objects.filter(**validated_data)
        if len(address_type):
            return address_type[0]
        address_type_obj = AddressType.objects.create(**validated_data)
        address_type_obj.save()
        return address_type_obj


class AddressSerializer(serializers.HyperlinkedModelSerializer):
    address_type = serializers.SlugRelatedField(slug_field='pk',required=True,queryset=AddressType.objects.all().select_related())

    class Meta:
        model = Address
        fields = ('pk', 'line1', 'line2', 'country', 'state', 'city', 'postal_code', 'address_type')

    def create(self, validated_data):
        address = Address.objects.filter(**validated_data)
        if len(address):
            return address[0]
        address_obj = Address.objects.create(**validated_data)
        address_obj.save()
        return address_obj


class EmployeeAddressSerializer(serializers.HyperlinkedModelSerializer):
    address = serializers.SlugRelatedField(slug_field='pk',required=True,queryset=Address.objects.all().select_related('address_type'))
    employee = serializers.SlugRelatedField(slug_field='pk',required=True,queryset=Employee.objects.all().select_related())

    class Meta:
        model = EmployeeAddress
        fields = ('pk', 'address', 'employee')

    def create(self, validated_data):
        employee_address = EmployeeAddress.objects.filter(**validated_data)
        if len(employee_address):
            return employee_address[0]
        employee_address_obj = EmployeeAddress.objects.create(**validated_data)
        employee_address_obj.save()
        return employee_address_obj



class ExpenseCatagorySerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = ExpenseCatagory
        fields = ('pk', 'catagory')

    def create(self, validated_data):
        expense_catagory = ExpenseCatagory.objects.filter(**validated_data)
        if len(expense_catagory):
            return expense_catagory[0]
        expense_catagory_obj = ExpenseCatagory.objects.create(**validated_data)
        expense_catagory_obj.save()
        return expense_catagory_obj



class TaxCodeSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = TaxCode
        fields = ('pk', 'code', 'percentage')

    def create(self, validated_data):
        tax_code = TaxCode.objects.filter(**validated_data)
        if len(tax_code):
            return tax_code[0]
        tax_code_obj = TaxCode.objects.create(**validated_data)
        tax_code_obj.save()
        return tax_code_obj


class ExpenseSerializer(serializers.HyperlinkedModelSerializer):
    employee = serializers.SlugRelatedField(slug_field='pk',required=True,queryset=Employee.objects.all().select_related())
    expense_catagory = serializers.SlugRelatedField(slug_field='pk',required=True,queryset=ExpenseCatagory.objects.all().select_related())
    tax_code = serializers.SlugRelatedField(slug_field='pk',required=True,queryset=TaxCode.objects.all().select_related())

    class Meta:
        model = Expense
        fields = ('pk', 'employee', 'subtotal',  'total', 'date', 'expense_catagory', 'tax_code', 'created', 'updated', 'is_active')
