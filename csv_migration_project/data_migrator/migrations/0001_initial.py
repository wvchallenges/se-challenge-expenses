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
                ('employee_name', models.CharField(max_length=255)),
                ('employee_address', models.CharField(max_length=512)),
            ],
        ),
        migrations.CreateModel(
            name='EmployeeExpenseModel',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('expense_date', models.DateTimeField()),
                ('pre_tax_amount', models.DecimalField(max_digits=10, decimal_places=2)),
                ('tax_amount', models.DecimalField(max_digits=10, decimal_places=2)),
                ('expense_discription', models.CharField(max_length=1024)),
                ('tax_name', models.CharField(max_length=255)),
                ('employee', models.ForeignKey(to='data_migrator.Employee')),
            ],
        ),
        migrations.CreateModel(
            name='ExpenseCategory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('category_name', models.CharField(max_length=255)),
            ],
        ),
        migrations.AddField(
            model_name='employeeexpensemodel',
            name='expense_category',
            field=models.ForeignKey(to='data_migrator.ExpenseCategory'),
        ),
    ]
