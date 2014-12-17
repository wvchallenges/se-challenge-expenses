# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=512)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('category', models.CharField(max_length=512)),
                ('description', models.TextField()),
                ('pre_tax', models.FloatField()),
                ('tax_type', models.CharField(max_length=512)),
                ('tax_amount', models.FloatField()),
                ('employee', models.ForeignKey(to='challenge.Employee')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
