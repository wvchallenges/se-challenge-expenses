from django.conf.urls import url
from rest_framework.routers import DefaultRouter

from .views import FileUploadView, AddressViewSet, AddressTypeViewSet, EmployeeViewSet, EmployeeAddressViewSet, ExpenseViewSet, ExpenseCatagoryViewSet, TaxCodeViewSet, UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, base_name='User')
router.register(r'address', AddressViewSet, base_name='Address')
router.register(r'address_type', AddressTypeViewSet, base_name='AddressType')
router.register(r'employee', EmployeeViewSet, base_name='Employee')
router.register(r'employee_address', EmployeeAddressViewSet, base_name='EmployeeAddress')
router.register(r'expense', ExpenseViewSet, base_name='Expense')
router.register(r'expense_catagory', ExpenseCatagoryViewSet, base_name='ExpenseCatagory')
router.register(r'tax_code', TaxCodeViewSet, base_name='TaxCode')

urlpatterns = router.urls
