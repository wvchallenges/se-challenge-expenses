from __future__ import absolute_import, unicode_literals

from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound

from expenses.csvfiles.queries import get_monthly_expenses


@view_config(
    route_name='csvfiles view',
    renderer='./templates/view.mako',
    request_method='GET')
def view(request):
    """
    Render a table of months and their total expenses.

    :param request: The current request object.
    :type request: :class:`pyramid.request.Request`
    """
    csv_file_id = request.matchdict.get('csv_file_id')
    expenses = get_monthly_expenses(request.db_session, csv_file_id)
    if not expenses.count():
        raise HTTPNotFound
    return {
        'title': 'Expense Summary',
        'expenses': expenses
    }
