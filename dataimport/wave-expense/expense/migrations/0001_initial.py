# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('category', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('address', models.CharField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateField()),
                ('description', models.CharField(max_length=250)),
                ('pre_tax', models.DecimalField(max_digits=19, decimal_places=2)),
                ('tax_name', models.CharField(max_length=50)),
                ('tax_amount', models.DecimalField(max_digits=19, decimal_places=2)),
                ('category', models.ForeignKey(to='expense.Category')),
                ('employee', models.ForeignKey(to='expense.Employee')),
            ],
        ),
    ]
