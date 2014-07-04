from django.core.management.base import BaseCommand

from wavese.app.services import cmd_line_query


class Command(BaseCommand):

    def handle(self, *args, **options):
        cmd_line_query(args[0], args[1])