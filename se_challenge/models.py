import csv
from django.db import models
from django.utils.text import ugettext_lazy as _


class Report(models.Model):

    report_file = models.FileField(_("Report file"))
    upload_date = models.DateTimeField(_("Upload date"), auto_now_add=True, blank=True)


class Category(models.Model):

    name = models.CharField(_("Name"), max_length=255)

    def __str__(self):
        return self.name


class Employee(models.Model):

    full_name = models.CharField(_("Full name"), max_length=255)
    addresses = models.ManyToManyField('se_challenge.OfficeAddress', verbose_name=_("Addresses"))

    def __str__(self):
        return self.full_name

    @property
    def first_name(self):
        return self.full_name.split()[0]

    @property
    def last_name(self):
        split_name = self.full_name.split()
        return split_name[1] if len(split_name) > 1 else ''


class OfficeAddress(models.Model):

    address = models.CharField(_("Address"), max_length=511)

    def __str__(self):
        return self.address


class Expense(models.Model):

    date = models.DateField(_("Date"))
    category = models.ForeignKey('se_challenge.Category', verbose_name=_("Category"))
    employee = models.ForeignKey('se_challenge.Employee', verbose_name=_("Employee"))
    employee_address = models.ForeignKey('se_challenge.OfficeAddress', verbose_name=_("Employee address"))
    description = models.CharField(_("Description"), max_length=255)
    pre_tax = models.DecimalField(_("Pre-tax amount"), max_digits=8, decimal_places=2)
    tax_name = models.CharField(_("Tax type"), max_length=255)
    tax = models.DecimalField(_("Tax amount"), max_digits=8, decimal_places=2)

    report = models.ForeignKey('se_challenge.Report', verbose_name=_("Report"))

    class Meta:
        verbose_name = _("Entry")
        verbose_name_plural = _("Entries")

    def __str__(self):
        return self.description
