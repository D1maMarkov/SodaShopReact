from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from datetime import datetime, timedelta
from django.core.mail import send_mail
from django.http import HttpResponse, JsonResponse
from django.conf import settings
from dateutil.tz import tzoffset
from random import randrange
from .models import *
import json


timezone_offset = -8.0  # Pacific Standard Time (UTC−08:00)
tzinfo = tzoffset(None, timezone_offset * 3600)  # offset in seconds
    
@csrf_exempt
def login_user(request):
    user = authenticate(username=request.POST["username"], password=request.POST["password"])
    
    if user is None:
        return HttpResponse(status=202)
    
    login(request, user)
    return HttpResponse(status=200)


def check_confirm_email_token(request, token):
    start_date = datetime.now(tzinfo) - timedelta(hours = 1)
    end_date = datetime.now(tzinfo)
    
    token_exists = TokenToConfirmEmail.objects.filter(token=token).exists()
    if not token_exists:
        return HttpResponse(json.dumps({
            "valid": False,
            "message": "Incorrect url adress"
            })
        )

    tokens = TokenToConfirmEmail.objects.filter(created_at__range=[start_date, end_date])
    token_exists = tokens.filter(token=token)
    
    if not token_exists:
        return HttpResponse(json.dumps({
            "valid": False,
            "message": "You take too long to confirm the email. Try to register again"
            })
        )

    return HttpResponse(json.dumps({
        "valid": True
        })
    )

@csrf_exempt
def register_user(request):
    user_exists = User.objects.filter(username=request.POST["username"]).exists()
    if user_exists:
        return HttpResponse(status=202)
    
    email_exists = CustomUser.objects.filter(email=request.POST["email"]).exists()
    if email_exists:
        return HttpResponse(status=201)
    
    code = ''.join(map(str, [randrange(0, 10) for i in range(6)]))
    
    send_mail('verification code', code, settings.EMAIL_HOST_USER, [request.POST["email"]], fail_silently=False)
    
    token_value = ''.join(map(str, [randrange(0, 10) for i in range(32)]))
    
    token = TokenToConfirmEmail.objects.create(
        username = request.POST["username"],
        password = request.POST["password"],
        email = request.POST["email"],
        token = token_value,
        code = code
    )
    
    token.save()
    
    return HttpResponse(json.dumps(token_value))


@csrf_exempt
def change_fields(request):
    current_user =  CustomUser.objects.get(user=request.user)
    current_user.email = request.POST["email"]
    current_user.phone = "+" + request.POST["phone"][1::]
    current_user.adress = request.POST["adress"] if request.POST["adress"] else ""
    current_user.name = request.POST["username"]    
    current_user.save()

    return HttpResponse(status=200)


def confirm_email(request, token, verification_code):
    token_obj = TokenToConfirmEmail.objects.get(token=token)
    code = token_obj.code
    
    if code == verification_code:
        user = User.objects.create_user(username=token_obj.username, password=token_obj.password)
        
        CustomUser.objects.create(name=user.username, user=user, email=token_obj.email)
        
        user = authenticate(username=token_obj.username, password=token_obj.password)
        login(request, user)
        
        token_obj.delete()
        
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=202)


def send_new_code(request, token):
    token_obj = TokenToConfirmEmail.objects.filter(token=token)
    token_obj.update(code=new_code)
    
    new_code = ''.join(map(str, [randrange(0, 10) for i in range(6)]))
    
    send_mail('verification code', new_code, settings.EMAIL_HOST_USER, [token_obj.first().email])
    
    return HttpResponse(status=200)


def get_reset_token(request, email):
    user_exists = CustomUser.objects.filter(email=email).exists()
    if not user_exists:
        return HttpResponse(json.dumps("There is no user with such an email"))
    
    current_user = CustomUser.objects.get(email=email)
    
    start_date = datetime.now(tzinfo) - timedelta(hours = 1)
    end_date = datetime.now(tzinfo)
    
    if TokenToResetPassword.objects.exclude(created_at__range=[start_date, end_date]).filter(user=current_user).exists():
        TokenToResetPassword.objects.exclude(created_at__range=[start_date, end_date]).get(user=current_user).delete()
        
    token_exists = TokenToResetPassword.objects.filter(created_at__range=[start_date, end_date]).filter(user=current_user).exists()
    
    if token_exists:
        return HttpResponse(json.dumps("you have already received an email to reset your password"))
    
    token = TokenToResetPassword.objects.create(
        user = current_user,
        token = "".join([chr(randrange(97, 123)) for i in range(32)])
    )
    
    text = f'''
    password reset link\n
    http://127.0.0.1:8000/reset-password/{token.token} \n
    A password reset request has been sent to your email from the SodaStockOnlineStore website. If it wasn't you, please ignore this email
    '''
    
    send_mail('password reset link', text, settings.EMAIL_HOST_USER, [current_user.email])
    
    return HttpResponse(json.dumps("we have sent you an email to recover your password"))


@csrf_exempt
def check_token(request):    
    start_date = datetime.now(tzinfo) - timedelta(hours = 1)
    end_date = datetime.now(tzinfo)
    
    token_exists = TokenToResetPassword.objects.filter(token = request.POST["token"]).exists()
    if not token_exists:
        return HttpResponse(status=202)
    
    tokens = TokenToResetPassword.objects.filter(created_at__range=[start_date, end_date])
    token_exists = tokens.filter(token = request.POST["token"])
    if not token_exists:
        return HttpResponse(status=201)
    
    token = tokens.get(token = request.POST["token"])

    return HttpResponse(json.dumps(token.user.user.username))


@csrf_exempt
def reset_password(request):
    username = request.POST["username"][1:-1]
    
    user = User.objects.get(username = username)
    user.update(password=make_password(request.POST["password"]))
    
    user = authenticate(username=username, password=request.POST["password"])
    
    token = TokenToResetPassword.objects.get(user = CustomUser.objects.get(user=user))
    token.delete()
    
    login(request, user)
    
    return HttpResponse(status=200)
    

@csrf_exempt
def get_user_info(request):  
    if not request.user.is_authenticated:
        return HttpResponse(status=202)

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