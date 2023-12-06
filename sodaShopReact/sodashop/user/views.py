from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from datetime import datetime, timedelta
from django.core.mail import send_mail
from django.http import HttpResponse
from django.conf import settings
from dateutil.tz import tzoffset
from random import randrange
from .models import *
import json


timezone_offset = -8.0  # Pacific Standard Time (UTC−08:00)
tzinfo = tzoffset(None, timezone_offset * 3600)  # offset in seconds
    
@csrf_exempt
def LoginUser(request):
    user = authenticate(username=request.POST["username"], password=request.POST["password"])
    
    if user is None:
        return HttpResponse(status=202)
    
    login(request, user)
    return HttpResponse(status=200)


@csrf_exempt
def RegisterUser(request):
    userExists = User.objects.filter(username=request.POST["username"]).exists()
    if userExists:
        return HttpResponse(status=202)
    
    emailExists = CustomUser.objects.filter(email=request.POST["email"]).exists()
    if emailExists:
        return HttpResponse(status=201)
    
    code = ''.join(map(str, [randrange(0, 10) for i in range(6)]))
    
    send_mail('verification code', code, settings.EMAIL_HOST_USER, [request.POST["email"]], fail_silently=False)
    
    user = User.objects.create_user(username=request.POST["username"], password=request.POST["password"])
    user.save()
    
    customUser = CustomUser.objects.create(user=user, email=request.POST["email"], is_verificated=False, verification_code=code)
    customUser.save()
    
    user = authenticate(username=request.POST["username"], password=request.POST["password"])
    login(request, user)
    
    return HttpResponse(status=200)


@csrf_exempt
def changeFields(request):
    user = request.user
    CurrentUser =  CustomUser.objects.get(user=user)
    CurrentUser.email = request.POST["email"]
    CurrentUser.phone = "+" + request.POST["phone"][1::]
    CurrentUser.adress = request.POST["adress"] if request.POST["adress"] else ""
    CurrentUser.username = request.POST["username"]
    
    CurrentUser.save()
    
    return HttpResponse(status=200)


@csrf_exempt
def get_user_info(request):  
    if not request.user.is_authenticated:
        return HttpResponse(status = 202)
 
    user = request.user
    CurrentUser =  CustomUser.objects.get(user=user)
    
    info = {
        "username": CurrentUser.user.username,
        "email": CurrentUser.email,
        "phone": CurrentUser.phone if CurrentUser.phone != None else "",
        "adress": CurrentUser.adress if CurrentUser.adress != None else "",
    }
    
    return HttpResponse(json.dumps(info))


def Logout(request):
    logout(request)
    return HttpResponse(status=200)


def confirmEmail(request, verification_code):
    user = User.objects.get(username=request.user.get_username())
    code = CustomUser.objects.get(user=user)
    code = code.verification_code
    verification_code = int(verification_code)
    
    if code == verification_code:
        customUser = CustomUser.objects.get(user=user)
        customUser.is_verificated = True
        customUser.save()
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=202)


def sendNewCode(request):
    user = User.objects.get(username=request.user.get_username())
    customUser = CustomUser.objects.get(user=user)
    
    code = ''.join(map(str, [randrange(0, 10) for i in range(6)]))
    
    customUser.verification_code = code
    customUser.save()
    
    send_mail('verification code', code, settings.EMAIL_HOST_USER, [customUser.email])
    
    return HttpResponse(status=200)


def GetResetToken(request, email):
    userExists = CustomUser.objects.filter(email=email).exists()
    if not userExists:
        return HttpResponse(status=202)
    
    currentUser = CustomUser.objects.get(email=email)
    
    start_date = datetime.now(tzinfo) - timedelta(hours = 1)
    end_date = datetime.now(tzinfo)
    
    if TokenToResetPassword.objects.exclude(created_at__range=[start_date, end_date]).filter(user=currentUser).exists():
        TokenToResetPassword.objects.exclude(created_at__range=[start_date, end_date]).get(user=currentUser).delete()
        
    tokenExists = TokenToResetPassword.objects.filter(created_at__range=[start_date, end_date]).filter(user=currentUser).exists()
    
    if tokenExists:
        return HttpResponse(status=201)
    
    token = "".join([chr(randrange(97, 123)) for i in range(32)])
    
    Token = TokenToResetPassword.objects.create(
        user = currentUser,
        token = token
    )
    
    Token.save()
    
    text = f'''
    password reset link\n
    http://127.0.0.1:8000/resetPassword/{token} \n
    A password reset request has been sent to your email from the SodaStockOnlineStore website. If it wasn't you, please ignore this email
    '''
    
    send_mail('password reset link', text, settings.EMAIL_HOST_USER, [currentUser.email])
    send_mail
    
    return HttpResponse(status=200)


@csrf_exempt
def CheckToken(request):    
    start_date = datetime.now(tzinfo) - timedelta(hours = 1)
    end_date = datetime.now(tzinfo)
    
    tokenExists = TokenToResetPassword.objects.filter(token = request.POST["token"]).exists()
    if not tokenExists:
        return HttpResponse(status=202)
    
    tokens = TokenToResetPassword.objects.filter(created_at__range=[start_date, end_date])
    tokenExists = tokens.filter(token = request.POST["token"])
    if not tokenExists:
        return HttpResponse(status=201)
    
    token = tokens.get(token = request.POST["token"])

    
    return HttpResponse(json.dumps(token.user.user.username))


@csrf_exempt
def ResetPassword(request):
    username = request.POST["username"][1:-1]
    
    user = User.objects.get(username = username)
    user.password = make_password(request.POST["password"])
    user.save()
    
    user = authenticate(username=username, password=request.POST["password"])
    
    token = TokenToResetPassword.objects.get(user = CustomUser.objects.get(user=user))
    token.delete()
    
    login(request, user)
    
    return HttpResponse(status=200)
    