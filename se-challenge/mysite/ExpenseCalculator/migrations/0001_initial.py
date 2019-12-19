# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MonthlyExpense',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', auto_created=True, serialize=False)),
                ('date', models.DateField(verbose_name='Date')),
                ('employee_name', models.CharField(max_length=200)),
                ('pre_tax', models.DecimalField(decimal_places=2, max_digits=6)),
                ('tax_amount', models.DecimalField(decimal_places=2, max_digits=6)),
                ('post_tax', models.DecimalField(decimal_places=2, max_digits=6)),
            ],
        ),
        migrations.CreateModel(
            name='RawExpenseSheet',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', auto_created=True, serialize=False)),
                ('date', models.DateField(verbose_name='Date')),
                ('category', models.CharField(max_length=200)),
                ('employee_name', models.CharField(max_length=200)),
                ('employee_address', models.CharField(max_length=200)),
                ('expense_description', models.CharField(max_length=200)),
                ('pre_tax', models.DecimalField(decimal_places=2, max_digits=6)),
                ('tax_name', models.CharField(max_length=200)),
                ('tax_amount', models.DecimalField(decimal_places=2, max_digits=6)),
                ('post_tax', models.DecimalField(decimal_places=2, max_digits=6)),
            ],
        ),
    ]
