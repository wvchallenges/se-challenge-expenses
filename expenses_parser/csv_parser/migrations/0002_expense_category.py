# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-06-27 08:09
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('csv_parser', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='expense',
            name='category',
            field=models.CharField(default='expense', max_length=64),
            preserve_default=False,
        ),
    ]
