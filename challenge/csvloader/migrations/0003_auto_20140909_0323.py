# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('csvloader', '0002_expense_imported'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='expense',
            options={'ordering': ['date']},
        ),
        migrations.AlterField(
            model_name='expense',
            name='imported',
            field=models.ForeignKey(editable=False, to='csvloader.Import', null=True),
        ),
    ]
