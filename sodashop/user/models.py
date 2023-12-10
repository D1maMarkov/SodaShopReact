from django.db import models
from django.contrib.auth.models import User


class CustomUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email = models.CharField(max_length=255)
    name = models.CharField(max_length=50, null=True)
    phone = models.CharField(max_length=50, null=True)
    adress = models.CharField(max_length=500, null=True)
    
class TokenToResetPassword(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    token = models.CharField(max_length=32)
    created_at = models.DateTimeField(auto_now_add=True)
    
class TokenToConfirmEmail(models.Model):
    username = models.CharField(max_length=50, null=True)
    password = models.CharField(max_length=50, null=True)
    email = models.CharField(max_length=100)
    token = models.CharField(max_length=32)
    code = models.IntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)