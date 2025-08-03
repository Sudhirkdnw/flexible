# core/urls.py
from django.urls import path
from core.views import *

urlpatterns = [
    path('student/register/', student_register, name='student-register'),
    path('login/', login_view, name='login'),
    path('dashboard/', dashboard, name='dashboard'),
    path('logout/', logout_view, name='logout'),
    path('student/profile/update/', update_student_profile, name='update_student_profile'),

]
