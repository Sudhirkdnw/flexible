from django.shortcuts import render
from course.models import Course

# Create your views here.

def index(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')

def career(request):
    return render(request, 'career.html')

def courses(request):
    # Import Course model
    
    # Fetch all courses from database
    courses = Course.objects.all()
    
    # Create context dictionary with courses data
    context = {
        'courses': courses
    }
 
    return render(request, 'courses.html', context)

def faq(request):
    return render(request, 'faq.html')


def contact(request):
    return render(request, 'contact.html')