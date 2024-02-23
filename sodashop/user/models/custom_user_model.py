from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    phone = models.CharField(max_length=11)
    adress = models.CharField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.username

    def set_phone(self, new_phone):
        self.phone = new_phone
        self.save()
        
    def set_name(self, new_name):
        self.username = new_name
        self.save()