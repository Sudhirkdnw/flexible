from django.contrib import admin, messages
from django.contrib.auth.admin import UserAdmin, GroupAdmin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _

from core.models import User, StudentProfile, Teacher

# ==========================
# Admin Panel Branding
# ==========================
admin.site.site_header = "Edvantage Admin Panel"
admin.site.site_title = "Edvantage Admin"
admin.site.index_title = "Welcome to Edvantage Dashboard"


# ==========================
# Custom User Admin
# ==========================
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Fields', {'fields': ('role',)}),
    )
    list_display = ('username', 'email', 'role', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_active')
    search_fields = ('username', 'email', 'role')
    ordering = ('username',)


# ==========================
# Student Profile Admin
# ==========================
@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'first_name', 'last_name', 'email', 'phone_number', 'image_preview', 'signature_preview']
    readonly_fields = ['image_preview', 'signature_preview']
    search_fields = ['user__username', 'first_name', 'last_name', 'email', 'phone_number', 'nationality', 'passport_number']
    list_filter = ['gender', 'marital_status', 'nationality', 'religion']

    fields = (
        'user',
        'first_name', 'last_name', 'date_of_birth', 'gender', 'nationality',
        'passport_number', 'country_of_birth', 'place_of_birth',
        'permanent_address', 'current_address',
        'email', 'phone_number', 'marital_status',
        'languages_spoken', 'religion',
        'image', 'image_preview', 'signature', 'signature_preview',
    )

    actions = ['mark_as_verified']

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(user__role='student')  # ✅ Sirf students dikhaye

    def mark_as_verified(self, request, queryset):
        updated = queryset.update(marital_status='single')  # ✅ using a valid choice
        self.message_user(request, f"{updated} student(s) marked as Verified", messages.SUCCESS)

    mark_as_verified.short_description = "Mark selected students as Verified"

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height:100px;" />', obj.image.url)
        return "(No image uploaded)"
    image_preview.short_description = "Profile Image Preview"

    def signature_preview(self, obj):
        if obj.signature:
            return format_html('<img src="{}" style="height:100px;" />', obj.signature.url)
        return "(No signature uploaded)"
    signature_preview.short_description = "Signature Preview"


# ==========================
# Teacher Admin
# ==========================
@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = (
        "username",      # from User
        "role",          # from User
        "first_name",
        "subject",
        "email",
        "experience",
        "nationality",
        "joined_date",
        "image_preview",
    )
    search_fields = ("username", "first_name", "subject", "email")
    list_filter = ("role", "subject", "experience", "nationality")

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(role='teacher')  # ✅ Only teachers

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height:100px;" />', obj.image.url)
        return "(No image uploaded)"
    image_preview.short_description = "Profile Image"
# ==========================
# Edvantage Admin Site
# ==========================
class FlexibleAdminSite(admin.AdminSite):
    site_header = "Edvantage Admin"
    site_title = "Edvantage Admin Portal"
    index_title = "Welcome to Edvantage Dashboard"

    def index(self, request, extra_context=None):
        extra_context = extra_context or {}

        # Role Counts
        total_students = User.objects.filter(role='student').count()
        total_teachers = Teacher.objects.filter(role='teacher').count()
        total_admins = User.objects.filter(role='admin').count()
        total_active = User.objects.filter(is_active=True).count()

        # Example Stats
        students_today = 5
        today_revenue = 2999

        extra_context.update({
            'total_students': total_students,
            'total_teachers': total_teachers,
            'total_admins': total_admins,
            'total_active': total_active,
            'students_today': students_today,
            'today_revenue': today_revenue,
        })

        return super().index(request, extra_context=extra_context)


# Register Models to Edvantage Admin Site
flexible_admin_site = FlexibleAdminSite(name='flexible_admin')
flexible_admin_site.register(User, CustomUserAdmin)
flexible_admin_site.register(StudentProfile, StudentProfileAdmin)
flexible_admin_site.register(Teacher, TeacherAdmin)
flexible_admin_site.register(Group, GroupAdmin)
