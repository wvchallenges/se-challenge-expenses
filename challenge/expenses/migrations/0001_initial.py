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
                ('name', models.CharField(max_length=255, db_index=True)),
            ],
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('address', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateTimeField()),
                ('description', models.TextField()),
                ('pre_tax_amount', models.DecimalField(max_digits=20, decimal_places=2)),
                ('tax_amount', models.DecimalField(max_digits=20, decimal_places=2)),
                ('employee', models.ForeignKey(to='expenses.Employee')),
            ],
        ),
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(max_length=255)),
                ('file', models.FileField(upload_to=b'')),
            ],
        ),
        migrations.CreateModel(
            name='Tax',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255, db_index=True)),
            ],
        ),
        migrations.AddField(
            model_name='expense',
            name='report',
            field=models.ForeignKey(to='expenses.Report'),
        ),
        migrations.AddField(
            model_name='expense',
            name='tax',
            field=models.ForeignKey(to='expenses.Tax'),
        ),
        migrations.AlterIndexTogether(
            name='employee',
            index_together=set([('name', 'address')]),
        ),
    ]
