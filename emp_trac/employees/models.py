from django.db import models
from django.contrib.auth.models import User


class Employee(models.Model):
    user = models.OneToOneField(User)
    address = models.CharField(max_length=255, blank=True, null=True)

    def __unicode__(self):
        return u"{0}, {1}".format(self.user.first_name, self.user.last_name)