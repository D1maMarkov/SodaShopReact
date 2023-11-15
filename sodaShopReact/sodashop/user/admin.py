from django.contrib import admin
from .models import *


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['user', 'email', 'is_verificated', 'phone', 'name']
    list_editable = ['user', 'email', 'is_verificated', 'phone', 'name']
    list_display_links = None
