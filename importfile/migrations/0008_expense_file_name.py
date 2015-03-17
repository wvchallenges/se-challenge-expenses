# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('importfile', '0007_auto_20150317_1126'),
    ]

    operations = [
        migrations.AddField(
            model_name='expense',
            name='file_name',
            field=models.CharField(default='', max_length=512),
            preserve_default=False,
        ),
    ]
