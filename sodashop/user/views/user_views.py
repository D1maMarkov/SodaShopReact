from ..forms import RegistrationForm, LoginForm, ResetPasswordForm, ChangeProfileFieldsForm, PasswordResetRequestForm
from ..models.token_models import TokenToConfirmEmail, TokenToResetPassword
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from ..models.custum_user_model import CustomUser
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings
from random import randrange


@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            user = authenticate(
                username=form.cleaned_data["username"], 
                password=form.cleaned_data["password"]
            )

            login(request, user)

            return JsonResponse({
                "status": "valid",
            })

        else:        
            return JsonResponse({
                "status": "invalid",
                'errors': form.errors
            })


@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            code = ''.join(map(str, [randrange(0, 10) for i in range(6)]))

            send_mail('verification code', code, settings.EMAIL_HOST_USER, [form.cleaned_data['email']], fail_silently=False)
            
            token_value = ''.join(map(str, [randrange(0, 10) for i in range(32)]))
            
            TokenToConfirmEmail.objects.create(
                username = form.cleaned_data['username'],
                password = form.cleaned_data['password'],
                email = form.cleaned_data['email'],
                token = token_value,
                code = code
            )

            return JsonResponse({
                "status": "valid",
                "message": token_value
                }
            )

        else:
            return JsonResponse({
                "status": "invalid",
                'errors': form.errors
            })


@csrf_exempt
def change_fields(request):
    if request.method == 'POST':
        form = ChangeProfileFieldsForm(request.POST)
        if form.is_valid():
            current_user =  CustomUser.objects.get(user=request.user)
            current_user.set_email(form.cleaned_data["email"])
            current_user.set_phone(form.cleaned_data["phone"])
            current_user.set_adress(form.cleaned_data["adress"])
            current_user.set_name(form.cleaned_data["username"])

            return JsonResponse({
                "status": "valid"
            })

        else:
            return JsonResponse({
                "status": "invalid",
                'errors': form.errors
            })


@csrf_exempt
def reset_password(request):
    if request.method == 'POST':
        form = ResetPasswordForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password1"]
            
            user = User.objects.get(username=username)
            user = CustomUser.objects.get(user=user)
            
            user.set_password(password)
            TokenToResetPassword.objects.get(user=user).delete()

            user = authenticate(username=username, password=password)
            login(request, user)
            
            return JsonResponse({
                "status": "valid",
            })

        else:
            return JsonResponse({
                "status": "invalid",
                'errors': form.errors
            })


@csrf_exempt
def get_user_info(request):  
    if not request.user.is_authenticated:
        return JsonResponse({
            "status": "invalid"
        })

    current_user =  CustomUser.objects.get(user=request.user)
    
    info = {
        "username": current_user.name,
        "email": current_user.email,
        "phone": current_user.phone if current_user.phone != None else "",
        "adress": current_user.adress if current_user.adress != None else "",
    }
    
    return JsonResponse({
        "status": "valid",
        "info": info
    })


def logout_user(request):
    logout(request)
    return HttpResponse(status=200)