from django.db import models
from django.contrib.auth.models import User


class CustomUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email = models.CharField(max_length=255)
    is_verificated = models.BooleanField()
    verification_code = models.IntegerField(null=True)
    name = models.CharField(max_length=50, null=True)
    phone = models.CharField(max_length=50, null=True)