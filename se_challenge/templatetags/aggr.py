from collections import defaultdict
from django import template

register = template.Library()


@register.filter()
def sum_expense(iterable, key):
    s = 0
    for item in iterable:
        s += getattr(item, key)
    return s


@register.filter()
def sum_expenses(iterable):
    s = defaultdict(int)
    for item in iterable:
        s['tax'] += getattr(item, 'tax', 0)
        s['pre_tax'] += getattr(item, 'pre_tax', 0)
    s['total'] = s['tax'] + s['pre_tax']
    return s
