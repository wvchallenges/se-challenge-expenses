from django.db import models


class Employee (models.Model):
    """ A simple Person model """
    name = models.CharField(max_length=256)
    address = models.CharField(max_length=256)

    def __unicode__(self):
        return self.name + ' @' + self.address


class Category (models.Model):
    """ Just a name for now """
    class Meta:
        verbose_name_plural = 'categories'

    name = models.CharField(max_length=256)

    def __unicode__(self):
        return self.name


class Tax (models.Model):
    class Meta:
        verbose_name_plural = 'taxes'

    name = models.CharField(max_length=256)

    def __unicode__(self):
        return self.name


class Expense (models.Model):
    date = models.DateField()
    employee = models.ForeignKey(Employee)
    category = models.ForeignKey(Category)
    tax = models.ForeignKey(Tax)
    description = models.CharField(max_length=256)
    pre_tax_amount = models.DecimalField(max_digits=12, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=12, decimal_places=2)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)

    def __unicode__(self):
        return self.description
