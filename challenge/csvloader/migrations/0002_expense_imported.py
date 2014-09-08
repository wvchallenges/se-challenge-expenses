# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('csvloader', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='expense',
            name='imported',
            field=models.ForeignKey(to='csvloader.Import', null=True),
            preserve_default=True,
        ),
    ]
