# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('data_migrator', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TaxName',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('tax_name', models.CharField(max_length=255)),
            ],
        ),
    ]
