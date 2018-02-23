from django.shortcuts import render
import csv
import codecs


def index(request):
    if request.POST and request.FILES:
        csvfile = request.FILES['csv_file']
        dialect = csv.Sniffer().sniff(codecs.EncodedFile(csvfile, "utf-8").read(1024))
        csvfile.open()
        reader = csv.reader(codecs.EncodedFile(csvfile, "utf-8"), delimiter=',', dialect=dialect)

    return render(request, "index.html", locals())

def upload_csv(request):
    data = {}
    if "GET" == request.method:
        return render(request, "expenses/upload_csv.html", data)


