# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('data_uploader', '0001_initial'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='employee',
            unique_together=set([('name', 'address')]),
        ),
    ]
