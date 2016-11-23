from django.db.models import Sum, connection
from wavese.app.models import SubsidiaryData


def cmd_line_query(start_date, end_date):
    truncate_date = connection.ops.date_trunc_sql('month', 'date')
    rows = SubsidiaryData.objects.filter(date__gte=start_date, date__lte=end_date).extra({'month': truncate_date})
    data = rows.values('month').annotate(Sum('tax_amount'), Sum('pre_tax_amount')).order_by('month')

    for row in data:
        row['total'] = row.get('tax_amount__sum') + row.get('pre_tax_amount__sum')
        print(row['month'], row['tax_amount__sum'], row['pre_tax_amount__sum'], row['total'])