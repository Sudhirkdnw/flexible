from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('career/', views.career, name='career'),
    path('courses/', views.courses, name='courses'),
    path('faq/', views.faq, name='faq'),
    path('signup/', views.signup, name='signup'),
]
