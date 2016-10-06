# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-10-05 23:37
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounting', '0002_auto_20161005_1937'),
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Expenses',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('category', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=200)),
                ('pre_tax_amount', models.DecimalField(decimal_places=5, max_digits=10)),
                ('tax_name', models.CharField(max_length=100)),
                ('tax_amount', models.DecimalField(decimal_places=5, max_digits=10)),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounting.Employee')),
            ],
        ),
    ]
