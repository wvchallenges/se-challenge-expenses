# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.CharField(max_length=512)),
                ('category', models.CharField(max_length=512)),
                ('employee_name', models.CharField(max_length=512)),
                ('employee_address', models.CharField(max_length=512)),
                ('expense_description', models.CharField(max_length=512)),
                ('pre_tax_amount', models.CharField(max_length=512)),
                ('tax_name', models.CharField(max_length=512)),
                ('tax_amount', models.CharField(max_length=512)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
