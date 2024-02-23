from utils.user_errors import errors as user_errors
from .models.custom_user_model import CustomUser
from django.contrib.auth import authenticate
from utils.validators import is_valid_phone
from django import forms


class RegistrationForm(forms.Form):
    username = forms.CharField(max_length=100)
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)
    
    def clean(self):
        cleaned_data = super().clean()
        username = cleaned_data.get('username')
        email = cleaned_data.get('email')

        user_exists = CustomUser.objects.filter(username=username).exists()
        email_exists = CustomUser.objects.filter(email=email).exists()
        
        if user_exists:
            self.add_error("username", user_errors["username_alredy_exists"])
        
        if email_exists:
            self.add_error("email", user_errors["email_alredy_exists"])


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
    email = forms.EmailField(error_messages = {
        'required': user_errors["incorrect_email"], 
        'invalid': user_errors["incorrect_email"]
    })

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
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].error_messages = {'required': user_errors["empty_username"]}
        self.fields['email'].error_messages = {
            'required': user_errors["incorrect_email"], 
            'invalid': user_errors["incorrect_email"]
        }

    def clean_phone(self):
        phone = self.cleaned_data['phone']

        if not is_valid_phone(phone):
            self.add_error("phone", user_errors["incorrect_phone"])
            
        return phone