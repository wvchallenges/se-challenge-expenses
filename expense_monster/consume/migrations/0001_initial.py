# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-15 23:33
from __future__ import unicode_literals

import consume.models
from django.db import migrations, models
import django.db.models.deletion
import encrypted_fields.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('csv_file', models.FileField(blank=True, upload_to='csv_backup')),
                ('upload_date', models.DateField()),
                ('date', models.DateTimeField()),
                ('description', encrypted_fields.fields.EncryptedCharField(max_length=250)),
                ('pre_tax_amount', consume.models.EncryptedDecimalField(decimal_places=2, default=0.0, max_digits=11, verbose_name='Pre-tax Amount')),
                ('tax_amount', consume.models.EncryptedDecimalField(decimal_places=2, default=0.0, max_digits=11)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='consume.Category')),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='consume.Employee')),
            ],
        ),
        migrations.CreateModel(
            name='Tax',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
            ],
        ),
        migrations.AddField(
            model_name='expense',
            name='tax',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='consume.Tax'),
        ),
    ]
