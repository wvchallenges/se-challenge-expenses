from challenge.main.decorators import render_to


@render_to('main/index.html')
def index(request):
    pass
