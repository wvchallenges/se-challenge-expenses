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
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('amount', models.FloatField(default=0)),
                ('tax_amount', models.FloatField(default=0)),
                ('date', models.DateTimeField()),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='TaxType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='UploadBatch',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('filename', models.CharField(max_length=200)),
                ('upload_date', models.DateTimeField()),
            ],
        ),
        migrations.AddField(
            model_name='expense',
            name='batch',
            field=models.ForeignKey(to='dataimport.UploadBatch'),
        ),
        migrations.AddField(
            model_name='expense',
            name='category',
            field=models.ForeignKey(to='dataimport.Category'),
        ),
        migrations.AddField(
            model_name='expense',
            name='owner',
            field=models.ForeignKey(to='dataimport.Employee'),
        ),
        migrations.AddField(
            model_name='expense',
            name='tax_type',
            field=models.ForeignKey(to='dataimport.TaxType'),
        ),
    ]
