from django.db import models

from .custom_user_model import CustomUser


class BaseToken(models.Model):
    token = models.CharField(max_length=32, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True


class TokenToResetPassword(BaseToken):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)


class TokenToConfirmEmail(BaseToken):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    email = models.EmailField(max_length=100)
    code = models.PositiveIntegerField()
