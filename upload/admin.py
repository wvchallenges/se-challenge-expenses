from django.contrib import admin
from .models import Document, DocumentEntry, MonthlyExpenditure

admin.site.register(Document)
admin.site.register(DocumentEntry)
admin.site.register(MonthlyExpenditure)
