# from django.shortcuts import render
from django.http import HttpResponse


def csv_upload(request):
    return HttpResponse("file upload dialog")


def total_expenses(requrest):
    return HttpResponse("expense report")
