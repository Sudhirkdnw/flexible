from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'index.html')

# def about(request):
#     return render(request, 'about.html')

# def contact(request):
#     return render(request, 'contact.html')

# def login_view(request):
#     return render(request, 'login.html')

# def register_view(request):
#     return render(request, 'register.html')
