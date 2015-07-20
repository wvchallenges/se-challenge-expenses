# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Record',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateTimeField(verbose_name=b'date')),
                ('expense_category', models.CharField(max_length=100)),
                ('employee_name', models.CharField(max_length=50)),
                ('employee_address', models.CharField(max_length=200)),
                ('expense_description', models.CharField(max_length=200)),
                ('sub_total', models.DecimalField(max_digits=12, decimal_places=2)),
                ('tax_name', models.CharField(max_length=50)),
                ('tax_amount', models.DecimalField(max_digits=12, decimal_places=2)),
            ],
        ),
    ]
