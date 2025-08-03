from django.contrib import admin, messages 
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.admin import AdminSite
from django.contrib.auth.models import Group
from django.contrib.auth.admin import GroupAdmin
from core.models import User, StudentProfile
from django.utils.html import format_html
from django.utils import timezone
from django.utils.timezone import now
from django.template.response import TemplateResponse



# Register your models here.
from django.utils.translation import gettext_lazy as _

admin.site.site_header = "Flexible Admin Panel"
admin.site.site_title = "Flexible Admin"
admin.site.index_title = "Welcome to Flexible Dashboard"

class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Fields', {'fields': ('role',)}),
    )
    list_display = ('username', 'email', 'role')

    def get_queryset(self, request):
        return super().get_queryset(request)

admin.site.register(User, CustomUserAdmin)

@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'first_name', 'last_name', 'email', 'phone_number']
    readonly_fields = ['image_preview', 'signature_preview']
     # ✅ SEARCH FIELDS
    search_fields = ['user__username', 'first_name', 'last_name', 'email', 'phone_number', 'nationality', 'passport_number']

    # ✅ FILTERS ON SIDEBAR
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

    def mark_as_verified(self, request, queryset):
        updated = queryset.update(marital_status='Verified')  # 🧠 Change to any field/action
        self.message_user(request, f"{updated} student(s) marked as Verified", messages.SUCCESS)

    mark_as_verified.short_description = "Mark selected students as Verified"

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height:100px;" />', obj.image.url)
        return "(No image uploaded)"

    def signature_preview(self, obj):
        if obj.signature:
            return format_html('<img src="{}" style="height:100px;" />', obj.signature.url)
        return "(No signature uploaded)"

    image_preview.short_description = "Profile Image Preview"
    signature_preview.short_description = "Signature Preview"




############### Register the custom admin class  #########################
User = get_user_model()

class FlexibleAdminSite(AdminSite):
    site_header = "Flexible Admin"
    site_title = "Flexible Admin Portal"
    index_title = "Welcome to Flexible Dashboard"

    def index(self, request, extra_context=None):
        extra_context = extra_context or {}

        # 🔢 Count logic for roles
        total_students = User.objects.filter(role='student').count()
        total_teachers = User.objects.filter(role='teacher').count()
        total_admins = User.objects.filter(role='admin').count()
        total_active = User.objects.filter(is_active=True).count()

        # 📊 Dummy Graph Data (you can fetch from DB too)
        students_today = 5
        today_revenue = 2999

        # ✅ Merge all data into context
        extra_context.update({
            'total_students': total_students,
            'total_teachers': total_teachers,
            'total_admins': total_admins,
            'total_active': total_active,
            'students_today': students_today,
            'today_revenue': today_revenue,
        })

        return super().index(request, extra_context=extra_context)

flexible_admin_site = FlexibleAdminSite(name='flexible_admin')
flexible_admin_site.register(User, CustomUserAdmin)
flexible_admin_site.register(StudentProfile, StudentProfileAdmin)
flexible_admin_site.register(Group, GroupAdmin)






