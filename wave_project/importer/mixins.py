from django import http
from django.http import JsonResponse


class JSONResponseMixin(object):
    """
    Simple serialization of context object into a JSON representation
    """

    def render_to_response(self, context):
        return self.get_json_response(self.convert_context_to_json(context))

    def get_json_response(self, content, **httpresponse_kwargs):
        return http.HttpResponse(content,
                                 content_type='application/json',
                                 **httpresponse_kwargs)

    def convert_context_to_json(self, context):
        """
        Serializes the context into json.  For this, simple is good, so use the built in Python JSON serializer.

        :param context:
        :return: json response
        """

        response = JsonResponse(context[self.ajax_context_object_name])
        return response
