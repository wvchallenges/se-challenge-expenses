from django.db import models

class Employee(models.Model):
	name = models.CharField(max_length=100)
	address = models.CharField(max_length=200)

class Expenses(models.Model):
	employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
	date = models.DateTimeField()
	category = models.CharField(max_length=100)
	description = models.CharField(max_length=200)
	pre_tax_amount = models.DecimalField(decimal_places=5, max_digits=10)
	tax_name = models.CharField(max_length=100)
	tax_amount = models.DecimalField(decimal_places=5, max_digits=10)

class UploadFile(models.Model):
    file = models.FileField(upload_to='files/%Y/%m/%d')

# Create your models here.
