
# Create your views here.
# core/views.py
from django.shortcuts import render, redirect, get_object_or_404
from core.forms import StudentRegistrationForm, LoginForm,StudentProfileForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from core.models import StudentProfile
from course.models import UserCourse


User = get_user_model()

def student_register(request):
    if request.method == 'POST':
        form = StudentRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = StudentRegistrationForm()
    return render(request, 'core/register.html', {'form': form})


def login_view(request):
    loginform = LoginForm(request.POST or None)  # Always initialize

    if request.method == 'POST':
        if loginform.is_valid():
            uname = loginform.cleaned_data['username']
            pwd = loginform.cleaned_data['password']
            user = authenticate(request, username=uname, password=pwd)

            if user:
                login(request, user)

                # Role-based redirection
                if user.role == 'student':
                    return redirect('dashboard')  # URL name for student dashboard
                elif user.role == 'teacher':
                    return redirect('/')  # URL name for teacher dashboard
                elif user.role == 'admin' or 'Admin':
                    return redirect('/admin/')  # Django default admin panel

                # Fallback if role doesn't match
                return redirect('dashboard')

            else:
                loginform.add_error(None, 'Invalid username or password')

    return render(request, 'core/login.html', {'form': loginform})

@login_required(login_url='login')
def dashboard(request):
    user = request.user
    profile = getattr(user, 'studentprofile', None)  # fetch student profile if exists
    user_courses = UserCourse.objects.filter(user=user)  # fetch user courses

    context = {
        'user': user,
        'profile': profile,
        'user_courses': user_courses
    }
    return render(request, 'core/dashboard.html', context)

@login_required
def logout_view(request):
    logout(request)
    return redirect('login')



@login_required
def update_student_profile(request):
    profile, created = StudentProfile.objects.get_or_create(user=request.user)
    if request.method == 'POST':
        form = StudentProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            return redirect('dashboard')  # or success page
    else:
        form = StudentProfileForm(instance=profile)
    return render(request, 'core/update_student_profile.html', {'form': form})