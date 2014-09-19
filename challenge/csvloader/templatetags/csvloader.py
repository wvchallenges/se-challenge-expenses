from django import template

register = template.Library()

@register.filter('sum_field')
def sum_field(records, field):
	total = 0
	for record in records:
		total += getattr(record, field)

	return total

@register.filter('expenses_for_tax')
def expenses_for_tax(expenses, tax_name):
	return filter(lambda e: e.tax.tax_name==tax_name, expenses)
