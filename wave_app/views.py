from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index():

    return HttpResponse('This is the index page.')


def upload():

    return HttpResponse('This is the upload page.')


def totals():

    return HttpResponse('This is the totals page.')


def parse_csv():

    return HttpResponse('This is the parse page.')

