# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-21 04:29
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('newCompany', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='company_database',
            name='Expense',
        ),
        migrations.AlterField(
            model_name='company_database',
            name='Date',
            field=models.DateField(),
        ),
    ]
