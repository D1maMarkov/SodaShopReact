from django.contrib import admin
from .models.custum_user_model import *
from .models.token_models import TokenToConfirmEmail, TokenToResetPassword


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['user', 'email', 'phone', 'name']
    list_editable = ['user', 'email', 'phone', 'name']
    list_display_links = None

@admin.register(TokenToResetPassword)
class TokenToResetPasswordAdmin(admin.ModelAdmin):
    list_display = ['user', 'token', 'created_at']
    list_editable = ['user', 'token']
    list_display_links = None
    
@admin.register(TokenToConfirmEmail)
class TokenToConfirmEmailAdmin(admin.ModelAdmin):
    list_display = ['username', 'password','email', 'token', 'created_at', 'code']
    list_editable = ['email', 'token', 'code']
    list_display_links = None