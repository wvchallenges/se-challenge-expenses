import functools
from django.shortcuts import render_to_response
from django.template import RequestContext


def render_to(template=None, mimetype=None):
    def renderer(function):
        @functools.wraps(function)
        def wrapper(request, *args, **kwargs):
            output = function(request, *args, **kwargs)
            if output and not isinstance(output, dict):
                return output
            return render_to_response(output and output.get('TEMPLATE') or
                    template, output, context_instance=RequestContext(request))
        return wrapper
    return renderer
