from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model


# Create your models here.

class User(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('teacher', 'Teacher'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    
    def __str__(self):
        return f"{self.username} ({self.role})"



User = get_user_model()

GENDER_CHOICES = [('male', 'Male'), ('female', 'Female'), ('other', 'Other')]
MARITAL_CHOICES = [('single', 'Single'), ('married', 'Married'), ('divorced', 'Divorced')]

class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    nationality = models.CharField(max_length=100)
    passport_number = models.CharField(max_length=50, blank=True, null=True)
    country_of_birth = models.CharField(max_length=100)
    place_of_birth = models.CharField(max_length=100)
    permanent_address = models.TextField()
    current_address = models.TextField(blank=True, null=True)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    marital_status = models.CharField(max_length=10, choices=MARITAL_CHOICES)
    languages_spoken = models.CharField(max_length=200)
    religion = models.CharField(max_length=100, blank=True, null=True)
    image = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    signature = models.ImageField(upload_to='signatures/', null=True, blank=True)

    def __str__(self):
        return f"{self.user} - {self.first_name} {self.last_name}"    



class Teacher(models.Model):
    username = models.CharField(max_length=150, unique=True)  # Username directly
    role = models.CharField(
        max_length=20,
        choices=[
            ('teacher', 'Teacher'),
            ('student', 'Student'),
            ('admin', 'Admin')
        ],
        default='teacher'
    )
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    subject = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    image = models.ImageField(upload_to='teacher_images/', null=True, blank=True)
    nationality = models.CharField(max_length=100)
    phone = models.CharField(max_length=15, blank=True, null=True)
    experience = models.PositiveIntegerField(help_text="Experience in years")
    joined_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} - {self.subject}"