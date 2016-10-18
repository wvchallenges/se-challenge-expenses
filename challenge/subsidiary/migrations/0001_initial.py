# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-10-17 08:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('category', models.TextField()),
                ('emp_name', models.TextField()),
                ('emp_address', models.TextField()),
                ('exp_description', models.TextField()),
                ('pre_tax', models.FloatField()),
                ('tax_name', models.TextField()),
                ('tax', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Test',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.FloatField()),
            ],
        ),
    ]
