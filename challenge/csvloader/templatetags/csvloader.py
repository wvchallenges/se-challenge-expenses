from django import template

register = template.Library()

@register.filter('sum_field')
def sum_field(records, field):
	total = 0
	for record in records:
		total += getattr(record, field)

	return total
