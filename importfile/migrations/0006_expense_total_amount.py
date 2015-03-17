# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('importfile', '0005_auto_20150317_1015'),
    ]

    operations = [
        migrations.AddField(
            model_name='expense',
            name='total_amount',
            field=models.DecimalField(default=0, max_digits=10, decimal_places=2),
            preserve_default=False,
        ),
    ]
