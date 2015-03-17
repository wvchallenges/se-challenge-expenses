# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('importfile', '0004_auto_20150317_1007'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='pre_tax_amount',
            field=models.DecimalField(max_digits=9, decimal_places=2),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='expense',
            name='tax_amount',
            field=models.DecimalField(max_digits=9, decimal_places=2),
            preserve_default=True,
        ),
    ]
