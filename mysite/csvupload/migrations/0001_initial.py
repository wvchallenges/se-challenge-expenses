# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='EmployeeExpenses',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, primary_key=True, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('updated_on', models.DateTimeField(auto_now=True)),
                ('date', models.DateField()),
                ('category', models.CharField(max_length=50)),
                ('employee_name', models.CharField(max_length=100)),
                ('employee_address', models.CharField(max_length=200)),
                ('expense_description', models.CharField(max_length=200)),
                ('pretax_amount', models.DecimalField(decimal_places=2, max_digits=9)),
                ('tax_name', models.CharField(max_length=50)),
                ('tax_amount', models.DecimalField(decimal_places=2, max_digits=9)),
            ],
        ),
    ]
