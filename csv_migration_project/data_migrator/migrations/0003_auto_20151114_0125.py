# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('data_migrator', '0002_taxname'),
    ]

    operations = [
        migrations.RenameField(
            model_name='employeeexpensemodel',
            old_name='expense_discription',
            new_name='expense_description',
        ),
    ]
