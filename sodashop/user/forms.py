from utils.user_errors import errors as user_errors
from .models.custum_user_model import CustomUser
from django.contrib.auth import authenticate
from utils.validators import is_valid_phone
from django.contrib.auth.models import User
from django import forms


class RegistrationForm(forms.Form):
    username = forms.CharField(max_length=100)
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)
    
    def clean(self):
        cleaned_data = super().clean()
        username = cleaned_data.get('username')
        email = cleaned_data.get('email')

        errors = {
            "username": "",
            "email": "",
            "password": ""
        }

        user_exists = User.objects.filter(username=username).exists()
        email_exists = CustomUser.objects.filter(email=email).exists()
        
        if user_exists:
            errors["username"] = user_errors["username_alredy_exists"]
        
        if email_exists:
            errors["email"] = user_errors["email_alredy_exists"]

        no_errors = True
        
        for error in errors.values():
            if len(error) > 0:
                no_errors = False

        if not no_errors:
            for key in errors:
                self.add_error(key, errors[key])


class LoginForm(forms.Form):
    username = forms.CharField(max_length=100)
    password = forms.CharField(widget=forms.PasswordInput)
    
    def clean(self):
        cleaned_data = super().clean()
        username = cleaned_data.get('username')
        password = cleaned_data.get('password')

        user = authenticate(username=username, password=password)

        if user is None:
            self.add_error("username", user_errors["incorrect_login_args"])

class PasswordResetRequestForm(forms.Form):
    email = forms.EmailField()
    
    def clean(self):
        cleaned_data = super().clean()
        email = cleaned_data.get("email")
        
        if email is None:
            self.add_error("email", user_errors["incorrect_email"])


class ResetPasswordForm(forms.Form):
    username = forms.CharField(max_length=100)
    password1 = forms.CharField(max_length=100)
    password2 = forms.CharField(max_length=100)

    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get("password1")
        password2 = cleaned_data.get("password2")

        if password1 != password2:
            self.add_error("password1", user_errors["different_passwords"])
            
            
class ChangeProfileFieldsForm(forms.Form):
    username = forms.CharField(max_length=100)
    email = forms.EmailField()
    phone = forms.CharField(max_length=100, required=False)
    adress = forms.CharField(max_length=120, required=False)

    def clean(self):
        cleaned_data = super().clean()
        username = cleaned_data.get("username")
        phone = cleaned_data.get("phone")
        email = cleaned_data.get("email")

        errors = {
            "username": "",
            "email": "",
            "phone": "",
        }

        if len(username) == 0:
            errors["username"] = user_errors["empty_username"]

        if phone is None or not is_valid_phone(phone):
            errors["phone"] = user_errors["incorrect_phone"]

        if email is None:
            errors["email"] = user_errors["incorrect_email"]

        no_errors = True

        for error in errors.values():
            if len(error) > 0:
                no_errors = False    

        if not no_errors:
            for key in errors:
                self.add_error(key, errors[key])