# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('expense', '0002_remove_expense_total'),
    ]

    operations = [
        migrations.AddField(
            model_name='expense',
            name='taxname',
            field=models.CharField(default=datetime.datetime(2015, 9, 18, 2, 44, 39, 842039, tzinfo=utc), max_length=50),
            preserve_default=False,
        ),
    ]
