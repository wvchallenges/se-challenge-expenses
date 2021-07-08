# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateTimeField()),
                ('description', models.CharField(max_length=255, null=True, blank=True)),
                ('amount', models.DecimalField(null=True, max_digits=10, decimal_places=2, blank=True)),
                ('tax_rate', models.DecimalField(null=True, max_digits=6, decimal_places=5, blank=True)),
                ('tax_name', models.CharField(max_length=255, null=True, blank=True)),
                ('tax_amount', models.DecimalField(null=True, max_digits=10, decimal_places=2, blank=True)),
                ('total_amount', models.DecimalField(null=True, max_digits=10, decimal_places=2, blank=True)),
                ('category', models.CharField(max_length=255, null=True, blank=True)),
                ('employee', models.ForeignKey(to='employees.Employee')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
