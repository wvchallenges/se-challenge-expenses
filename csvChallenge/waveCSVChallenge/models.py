from django.db import models


class Employees(models.Model):
    fullname_text = models.CharField(max_length=200)
    address_text = models.CharField(max_length=200)
