from rest_framework import viewsets, views
from expenses.serializers import ExpenseSerializer, FileUploadSerializer
from expenses.models import Expense, FileUpload
from expenses.parsers import PlainTextParser
from rest_framework.response import Response
from expenses import models
import expenses.constants as CONSTANTS
import re

class ExpenseViewSet(viewsets.ModelViewSet):
    """
    retrieve:
        Return a expense instance.

    list:
        Return all expenses, ordered by most recently joined.

    create:
        Create a new expense.

    delete:
        Remove an existing expense.

    partial_update:
        Update one or more fields on an existing expense.

    update:
        Update a expense.
    """
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer


class FileUploadView(views.APIView):
    parser_classes = (PlainTextParser,)
    
    def post(self, serializer):

        try:
            expenses = []
            first = True
            for row in self.request.data:

                row_items = list(row.items())
                # Skip header
                if(first):
                    first = False
                    continue
                expense = models.Expense()

                # Can't use keys, some bug with csv parsing library...
                # expense.date                = row[CONSTANTS.DATE]
                # expense.category            = row[CONSTANTS.CATEGORY]
                # expense.employee_name       = row[CONSTANTS.EMP_NAME]
                # expense.employee_address    = row[CONSTANTS.EMP_ADDR]
                # expense.expense_description = row[CONSTANTS.DESC]
                # expense.pre_tax_amount      = float(row[CONSTANTS.PRE_TAX_AMT])
                # expense.tax_name            = row[CONSTANTS.TAX_NAME]
                # expense.tax_amount          = float(row[CONSTANTS.TAX_AMT])

                expense.date                = row_items[0][1]
                expense.category            = row_items[1][1]
                expense.employee_name       = row_items[2][1]
                expense.employee_address    = row_items[3][1]
                expense.expense_description = row_items[4][1]
                expense.pre_tax_amount      = float(re.sub('[^0-9\.]', '', row_items[5][1]))
                expense.tax_name            = row_items[6][1]
                expense.tax_amount          = float(re.sub('[^0-9\.]', '', row_items[7][1]))

                expenses.append(expense)

            models.Expense.objects.bulk_create(expenses)
            return Response(status=200)
        except Exception as e:
            print(e.__cause__)
            return Response(str(e), status=500)
