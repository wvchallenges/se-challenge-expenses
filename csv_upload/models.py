from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User

class Expense(models.Model):
    spend_date = models.DateField('date')
    category = models.CharField(max_length=100)
    employee_name = models.CharField(max_length=100)
    employee_address = models.CharField(max_length=100)
    expense_description = models.CharField(max_length=200)
    pretax_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, default=0) #max is 99,999,999.00
    tax_name = models.CharField(max_length=100)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, default=0)    #max is 99,999,999.00

    def __unicode__(self):
        return "|".join([str(x) for x in [self.spend_date, self.category, self.employee_name, self.employee_address, self.expense_description, self.pretax_amount, self.tax_name, self.tax_amount]])

    class Meta:
        pass

class Webuser(models.Model):
    user = models.OneToOneField(User)
    name = models.CharField(max_length=50)

    def __unicode__(self):
        return self.name

def create_user_callback(sender, instance, **kwargs):
        webuser, new = Webuser.objects.get_or_create(user=instance)
post_save.connect(create_user_callback, User)
