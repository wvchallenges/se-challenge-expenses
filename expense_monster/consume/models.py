from __future__ import unicode_literals

from django.db import models

from encrypted_fields import EncryptedCharField, EncryptedFieldMixin


class EncryptedDecimalField(EncryptedFieldMixin, models.DecimalField):
    '''
    Designs an encrypted decimal field
    '''
    pass


class Employee(models.Model):
    '''
    Employee model with 2 fields

    Example:
        - name: Don Draper
        - address: "783 Park Ave, New York, NY 10021"
    '''

    name = models.CharField(
        max_length=100
    )

    address = models.CharField(
        max_length=200
    )

    def __unicode__(self):
        return self.name


class Category(models.Model):
    '''
    Category of the Expense model

    Example:
        - name: Travel
    '''

    name = models.CharField(
        max_length=150
    )

    def __unicode__(self):
        return self.name


class Tax(models.Model):
    '''
    Tax type for the Expense model

    Example:
        - name: CA Sales tax
    '''

    name = models.CharField(
        max_length=150
    )

    def __unicode__(self):
        return self.name


class Expense(models.Model):
    '''
    This model is the main expense model that is used by the consume app
    '''

    csv_file = models.FileField(
        blank=True, upload_to='csv_backup'
    )

    upload_date = models.DateField()

    date = models.DateTimeField()

    category = models.ForeignKey(Category)

    employee = models.ForeignKey(Employee)

    description = EncryptedCharField(max_length=250)

    pre_tax_amount = EncryptedDecimalField(
        default=0.0,
        blank=False,
        max_digits=11,
        decimal_places=2,
        verbose_name='Pre-tax Amount'
    )

    tax = models.ForeignKey(Tax)

    tax_amount = EncryptedDecimalField(
        default=0.0,
        blank=False,
        max_digits=11,
        decimal_places=2
    )

    def __unicode__(self):
        return self.description
