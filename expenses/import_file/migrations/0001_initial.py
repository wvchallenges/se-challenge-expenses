# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('address', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Expenses',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateField()),
                ('category', models.CharField(max_length=200)),
                ('expense_description', models.CharField(max_length=200)),
                ('pre_tax_amount', models.DecimalField(max_digits=19, decimal_places=2)),
                ('tax_name', models.CharField(max_length=200)),
                ('tax_amount', models.DecimalField(max_digits=19, decimal_places=2)),
                ('employee', models.ForeignKey(to='import_file.Employee')),
            ],
        ),
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.AddField(
            model_name='expenses',
            name='upload_file',
            field=models.ForeignKey(to='import_file.File'),
        ),
    ]
