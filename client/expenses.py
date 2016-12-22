import os.path
import click
import requests
from terminaltables import AsciiTable


ENDPOINT = "http://localhost:5000"


@click.command()
@click.option('--upload', default=False, help='Path to a well-formatted .csv file')
def expenses(upload):
    """Simple querying CLI to upload and display expenses from a csv file"""
    if upload:
        if os.path.isfile(upload):
            r = requests.post("%s/expenses" % ENDPOINT, files={
                'file': open(upload, 'rb')
            })
            if r.status_code == 200:
                print "Successfully uploaded %s" % upload
        else:
            raise "The file %s does not exist, check the given path" % upload

    result = requests.get("%s/expenses" % ENDPOINT)
    header = ['Year', 'Month', 'Total Expenses', 'Total Tax']
    expenses = result.json()
    expenses.insert(0, header)
    table = AsciiTable(expenses)
    print table.table

if __name__ == '__main__':
    expenses()
