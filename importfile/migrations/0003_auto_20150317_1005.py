# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('importfile', '0002_auto_20150317_0950'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='date',
            field=models.CharField(max_length=512),
            preserve_default=True,
        ),
    ]
