from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    # path('about/', views.about, name='about'),
    # path('contact/', views.contact, name='contact'),
    # path('login/', views.login_view, name='login'),
    # path('register/', views.register_view, name='register'),
]
