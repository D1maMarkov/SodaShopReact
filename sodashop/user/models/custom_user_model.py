from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    phone = models.CharField(max_length=50)
    adress = models.CharField(max_length=500)

    def __str__(self):
        return self.username
        
    def set_email(self, new_email):
        self.email = new_email
        self.save()
        
    def set_adress(self, new_adress):
        if len(new_adress) > 0:
            self.adress = new_adress
            self.save()

    def set_phone(self, new_phone):
        self.phone = new_phone
        self.save()
        
    def set_name(self, new_name):
        self.username = new_name
        self.save()