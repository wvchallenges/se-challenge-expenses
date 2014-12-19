from django import template


register = template.Library()

import datetime

@register.filter
def date_from_string(date_string):
    """ convert text date to date """
    return datetime.datetime.strptime(date_string, '%Y-%m-%d')