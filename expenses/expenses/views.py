from __future__ import absolute_import, unicode_literals

from pyramid.httpexceptions import HTTPFound
from pyramid.view import view_config

from expenses.expenses.helpers import BadCSVFile, save_csv_file


@view_config(
    route_name='expenses save',
    request_method='POST')
def save(request):
    """
    Save a POST supplied CSV file.

    The user is redirected to the csvfile view page if the csv is successfully
    saved. If the csv module can not processes the file, the user is redirected
    back to the home page and a flash error message is set.

    Note that the POST request must contain a `file` parameter.

    :param request: The current request object.
    :type request: :class:`pyramid.request.Request`
    """
    file = request.POST['file'].file
    try:
        csv_file = save_csv_file(request.db_session, file)
    except BadCSVFile:
        request.session.flash(
            'Oops! We couldn\'t process your CSV file. ' +
            'Please ensure that is a valid CSV file.')
        return HTTPFound(request.route_path('home'))

    return HTTPFound(request.route_path(
        'csvfiles view',
        csv_file_id=csv_file.csv_file_id))
