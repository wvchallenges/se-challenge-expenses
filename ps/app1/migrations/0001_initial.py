# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateField()),
                ('category', models.CharField(max_length=50)),
                ('name', models.CharField(max_length=50)),
                ('address', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=50)),
                ('pretax_amount', models.DecimalField(max_digits=6, decimal_places=2)),
                ('tax_name', models.CharField(max_length=50)),
                ('tax_amount', models.DecimalField(max_digits=4, decimal_places=2)),
            ],
        ),
    ]
