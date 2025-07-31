from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')

def career(request):
    return render(request, 'career.html')

def courses(request):
    return render(request, 'courses.html')

def faq(request):
    return render(request, 'faq.html')

def signup(request):
    return render(request, 'signup.html')

def contact(request):
    return render(request, 'contact.html')