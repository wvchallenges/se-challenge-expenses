from django.shortcuts import render

def index(request):
    if request.method == 'GET':
        return render(request, 'landing/index.html', {})