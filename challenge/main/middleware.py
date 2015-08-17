class ViewMiddleware(object):
    """
    Sets request.view to be the full path to the currently displayed view.
    """
    def process_view(self, request, view_func, view_args, view_kwargs):
        """
        Simply use view_func to set request.view.
        """
        module = getattr(view_func, '__module__', '').replace('.', '-')
        name = getattr(view_func, '__name__', '')

        request.view = '-'.join([module, name])
