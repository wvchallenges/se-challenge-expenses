from django.core.management.base import BaseCommand, CommandError

from consume.utils import import_csv_file


class Command(BaseCommand):
    args = '<filename>'
    help = 'Imports a list of expenses from a CSV file \
        and creates expense instances based on them.'
    requires_model_validation = True

    def handle(self, *args, **options):
        filename = args[0]
        self.stdout.write("Rwar! Eating expenses from csv file!")
        num_imported = import_csv_file(filename)
        self.stdout.write(
            'Burrrrp! I just consumed {} expense records'.format(num_imported))
