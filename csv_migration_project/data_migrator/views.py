from django.shortcuts import render

def data_migrator_page(request):
    if request.method == 'GET':
        return render(request, 'data_migrator/data_migrator_page.html')
