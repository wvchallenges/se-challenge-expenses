# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('importfile', '0006_expense_total_amount'),
    ]

    operations = [
        migrations.RenameField(
            model_name='expense',
            old_name='date',
            new_name='expense_date',
        ),
    ]
