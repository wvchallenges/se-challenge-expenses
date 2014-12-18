# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('challenge', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='expense',
            name='recent_data',
            field=models.BooleanField(default=True),
            preserve_default=True,
        ),
    ]
