from django.contrib import admin
from .models import *
# Register your models here.


admin.site.register(Employee)
admin.site.register(Expense)
admin.site.register(TaxType)
admin.site.register(Category)
admin.site.register(UploadBatch)