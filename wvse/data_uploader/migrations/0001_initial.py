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
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=60)),
                ('address', models.CharField(max_length=120)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateField()),
                ('category', models.CharField(max_length=60)),
                ('description', models.CharField(max_length=120)),
                ('pre_tax_amt', models.DecimalField(max_digits=7, decimal_places=2)),
                ('tax_name', models.CharField(max_length=12)),
                ('tax_amount', models.DecimalField(max_digits=6, decimal_places=2)),
                ('employee', models.ForeignKey(to='data_uploader.Employee')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ExpenseUpload',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('filename', models.CharField(max_length=200)),
                ('uploaded', models.DateTimeField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='expense',
            name='upload',
            field=models.ForeignKey(to='data_uploader.ExpenseUpload'),
            preserve_default=True,
        ),
    ]
