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
                ('amount', models.DecimalField(max_digits=10, decimal_places=2)),
                ('tax', models.DecimalField(default=0, verbose_name='Tax Name', max_digits=6, decimal_places=5, choices=[(0, 'Not Taxable'), (0.0875, 'NY Sales tax'), (0.075, 'CA Sales tax')])),
                ('category', models.CharField(default=b'Other', max_length=255, null=True, blank=True, choices=[(b'Travel', 'Travel'), (b'Computer - Hardware', 'Computer - Hardware'), (b'Computer - Software', 'Computer - Software'), (b'Meals and Entertainment', 'Meals and Entertainment'), (b'Office Supplies', 'Office Supplies'), (b'Other', 'Other')])),
                ('employee', models.ForeignKey(to='employees.Employee')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
