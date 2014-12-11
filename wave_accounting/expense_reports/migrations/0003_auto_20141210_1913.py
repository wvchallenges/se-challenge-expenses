# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('expense_reports', '0002_auto_20141208_2148'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='expense',
            unique_together=set([('date', 'category', 'name', 'address', 'description', 'pretax_amount', 'tax_name', 'tax_amount')]),
        ),
    ]
