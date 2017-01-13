from django.http import HttpResponseRedirect, HttpResponse
from django.views.generic import View
from django.shortcuts import render
import json
import re
from api.views import FileUploadView
from api.models import AddressType
from decimal import Decimal
from django.db import transaction
from django.db import connection


# Create your views here.
class Index(View):

    def get(self, request):
        js_viewmodel = {"app_name" : "wave_test"}
        js_viewmodel = json.dumps(js_viewmodel)
        context = {'js_viewmodel': js_viewmodel,
            'load_js': ['upload', 'utils'],
            'load_css': ['upload']}
        return render(request,"upload.html", context)

# Create your views here.
class ProcessExpenseFile(View):

    def get(self, request):
        TWOPLACES = Decimal(10) ** -2 #use to format
        error_str = ""
        file_lines = None
        with open('/webapps/wave-test1/upload/expenses.csv') as f:
            file_lines = f.readlines()

        output = dict(addresses=[], employees=[], tax_codes=[], expenses=[], expense_catagories=[], employee_addresses=[])
        helper_obj = HelperFunctions()
        address_type_obj = AddressType.objects.get(pk=1)
        for w, line in enumerate(file_lines):
            if w == 0:
                continue
            line = re.sub(r'(?!(([^"]*"){2})*[^"]*$),', ':', line)
            cells = line.split(',')
            line_state = dict(tax_code=None, employee=None, expense_catagory=None, address=None)
            for i, cell in enumerate(cells):
                if i == 0:
                    split_date = cell.split('/')
                    formatted_date = ''+split_date[2] + '-' + split_date[0] + '-' + split_date[1]
                    print (formatted_date)
                    output["expenses"].append(dict(date=formatted_date))
                if i == 1:
                    try:
                        expense_catagory = output["expense_catagories"].index(dict(catagory=cell))
                        line_state["expense_catagory"] = expense_catagory
                    except Exception as ex:
                        output["expense_catagories"].append(dict(catagory=cell))
                        line_state["expense_catagory"] = len(output["expense_catagories"]) -1
                if i == 2:
                    try:
                        employee = helper_obj.get_index_by_key(output["employees"], "username", cell)
                        line_state["employee"] = employee
                    except Exception as ex:
                        output["employees"].append(dict(username=cell))
                        line_state["employee"] = len(output["employees"]) -1
                if i == 3:
                    #\s(.+):\s(.+):\s(.+)\s(\d{5})
                    match = re.search(r'''^"(\d+)\s(.+):\s(.+):\s(.+)\s(\d{5})''', cell)
                    if match is None:
                        error_str += "Problem processing address - " + cell
                    else:
                        try:
                            address = output["addresses"].index(dict(line1=str(match.group(1) + ' ' + match.group(2)), line2="test", city=match.group(3), state=match.group(4), country='US', postal_code=match.group(5), address_type=address_type_obj.pk))
                            line_state["address"] = address
                        except Exception as ex:
                            output["addresses"].append(dict(line1=str(match.group(1) + ' ' + match.group(2)), line2="test", city=match.group(3), state=match.group(4), country='US', postal_code=match.group(5), address_type=address_type_obj.pk))
                            line_state["address"] = len(output["addresses"]) -1
                if i == 6:
                    try:
                        tax_code = output["tax_codes"].index(dict(code=cell, percentage=0))
                        line_state["tax_code"] = tax_code
                    except Exception as ex:
                        output["tax_codes"].append(dict(code=cell, percentage=0))
                        line_state["tax_code"] = len(output["tax_codes"]) -1

                if i == 4:
                    output["expenses"][w-1]["description"] = cell
                if i == 5:
                    print (cell)
                    if cell.startswith("\""):
                        print ("Found one of those fuckers")
                        cell = cell.replace("\"", "")
                        cell = cell.replace(":", "")
                        cell = cell.strip()
                        print (cell)
                        output["expenses"][w-1]["sub_total"] = cell.replace(',','.')
                    else:
                        output["expenses"][w-1]["sub_total"] = cell.replace(',','.')
                if i == 6:
                    try:
                        tax_code = output["tax_codes"].index(dict(code=cell, percentage=0))
                        line_state["tax_code"] = tax_code
                    except Exception as ex:
                        output["tax_codes"].append(dict(code=cell, percentage=0))
                        line_state["tax_code"] = len(output["tax_codes"]) -1
                if i == 7:
                    output["expenses"][w-1]["total"] = Decimal(float(output["expenses"][w-1]["sub_total"]) + float(cell)).quantize(Decimal('.01'))
                    output["expenses"][w-1]["tax_code"] = line_state["tax_code"]
                    output["expenses"][w-1]["employee"] = line_state["employee"]
                    output["expenses"][w-1]["expense_catagory"] = line_state["expense_catagory"]

            #check employee address
            try:
                employee_address = index(dict(employee=line_state["employee"], address=line_state["address"]))
            except Exception as ex:
                output["employee_addresses"].append(dict(employee=line_state["employee"], address=line_state["address"]))
        self.bulk_expense_create(output)
        return  HttpResponse(json.dumps({"status": "success", "errors": error_str}), content_type = "application/json")

    def bulk_expense_create(self, payload):
        api_view_obj = FileUploadView()
        with transaction.atomic():
            tax_codes = api_view_obj.generic_create('tax_code', payload["tax_codes"])
            expense_catagories = api_view_obj.generic_create('expense_catagory', payload["expense_catagories"])
            #addresses
            addresses = api_view_obj.generic_create('address', payload["addresses"])
            employees = api_view_obj.generic_create('employee', payload["employees"])
            match_count = 0
            print (tax_codes)
            employee_addresses = []
            for local_employee_address in payload["employee_addresses"]:
                local_employee = payload["employees"][local_employee_address["employee"]]
                for i, employee in enumerate(employees.data):
                    match = True
                    for key, value in local_employee.items():
                        for w_key, w_value in employee.items():
                            if w_key == key and w_key != "pk":
                                if w_value != value:
                                     match = False
                                     break
                            if not match:
                                break
                        if match:
                            employee_addresses.append(dict(employee=employee["pk"], address=None))
                local_address = payload["addresses"][local_employee_address["address"]]
                for w, address in enumerate(addresses.data):
                    match = True
                    for key, value in local_address.items():
                        for w_key, w_value in address.items():
                            if w_key == key and w_key != "pk" and w_key != "address_type":
                                if w_value != value:
                                     match = False
                                     break
                            if not match:
                                break
                    if match:
                        employee_addresses[-1]["address"] = address["pk"]

            employee_addresses_ret = api_view_obj.generic_create('employee_address', employee_addresses)
            #now do expenses i guess
            expenses = []
            for local_expense in payload["expenses"]:
                local_employee = payload["employees"][local_expense["employee"]]
                for i, employee in enumerate(employees.data):
                    match = True
                    for key, value in local_employee.items():
                        for w_key, w_value in employee.items():
                            if w_key == key and w_key != "pk":
                                if w_value != value:
                                     match = False
                                     break
                            if not match:
                                break
                        if match:
                            expenses.append(local_expense)
                            expenses[-1]["employee"] = employee["pk"]
                local_expense_catagory = payload["expense_catagories"][local_expense["expense_catagory"]]
                for i, expense_catagory in enumerate(expense_catagories.data):
                    match = True
                    for key, value in local_expense_catagory.items():
                        for w_key, w_value in expense_catagory.items():
                            if w_key == key and w_key != "pk":
                                if w_value != value:
                                     match = False
                                     break
                            if not match:
                                break
                    if match:
                        expenses[-1]["expense_catagory"] = expense_catagory["pk"]
                local_tax_code = payload["tax_codes"][local_expense["tax_code"]]
                for i, tax_code in enumerate(tax_codes.data):
                    match = True
                    if **local_tax_code.items() == **tax_code.items():
                        print ("this was much faster lol")
                    for key, value in local_tax_code.items():
                        for w_key, w_value in tax_code.items():
                            if w_key == key and w_key != "pk" and w_key != "percentage":
                                if w_value != value:
                                    match = False
                                    break
                            if not match:
                                break
                    if match:
                        expenses[-1]["tax_code"] = tax_code["pk"]
            print (tax_codes)
            expenses_ret = api_view_obj.generic_create('expense', expenses)
            sid = transaction.savepoint()
            transaction.savepoint_commit(sid)

class HelperFunctions():
    def get_index_by_key(self, data, key, value):
        return next(index for (index, d) in enumerate(data) if d[key] == value)
