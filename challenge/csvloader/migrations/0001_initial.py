# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateField()),
                ('category', models.CharField(max_length=200)),
                ('employee_name', models.CharField(max_length=200)),
                ('employee_address', models.TextField()),
                ('expense_description', models.CharField(max_length=200)),
                ('pre_tax_amount', models.DecimalField(max_digits=20, decimal_places=2)),
            ],
            options={
                'ordering': ['date'],
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Import',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateTimeField(default=datetime.datetime.now)),
                ('raw_data', models.TextField()),
                ('imported_by', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Tax',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('tax_name', models.CharField(max_length=50)),
                ('tax_amount', models.DecimalField(max_digits=20, decimal_places=2)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='expense',
            name='imported',
            field=models.ForeignKey(editable=False, to='csvloader.Import', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='expense',
            name='tax',
            field=models.ForeignKey(to='csvloader.Tax'),
            preserve_default=True,
        ),
    ]
