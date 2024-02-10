from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from ..forms import RegistrationForm, LoginForm
from django.contrib.auth.models import User
from django.core.mail import send_mail
from utils.user_errors import errors
from django.conf import settings
from random import randrange
from ..models import *
import json


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
    current_user =  CustomUser.objects.get(user=request.user)
    current_user.email = request.POST["email"]
    current_user.phone = "+" + request.POST["phone"][1::]
    current_user.adress = request.POST["adress"] if request.POST["adress"] else ""
    current_user.name = request.POST["username"]    
    current_user.save()

    return HttpResponse(status=200)


@csrf_exempt
def reset_password(request):
    username = request.POST["username"]
    
    user = User.objects.filter(username=username)
    user.update(password=make_password(request.POST["password"]))
    
    user = authenticate(username=username, password=request.POST["password"])
    
    token = TokenToResetPassword.objects.get(user=CustomUser.objects.get(user=user))
    token.delete()
    
    login(request, user)
    
    return HttpResponse(status=200)
    

@csrf_exempt
def get_user_info(request):  
    if not request.user.is_authenticated:
        return HttpResponse(json.dumps("not autorized"))

    current_user =  CustomUser.objects.get(user=request.user)
    
    info = {
        "username": current_user.name,
        "email": current_user.email,
        "phone": current_user.phone if current_user.phone != None else "",
        "adress": current_user.adress if current_user.adress != None else "",
    }
    
    return HttpResponse(json.dumps(info))


def logout_user(request):
    logout(request)
    return HttpResponse(status=200)