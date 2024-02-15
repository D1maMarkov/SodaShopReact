from django.contrib.auth.models import User
from django.db import models


class CustomUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=50, unique=True)
    phone = models.CharField(max_length=50)
    adress = models.CharField(max_length=500)

    def __str__(self):
        return self.name

    def set_password(self, new_password):
        self.user.set_password(new_password)
        self.user.save()
        
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
        self.name = new_name
        self.save()