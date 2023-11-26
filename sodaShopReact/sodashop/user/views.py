from django.http import HttpResponse
from django.contrib.auth.models import User
from .models import *
from django.conf import settings
import json
from random import randrange
from django.core.mail import send_mail
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from user.models import CustomUser


def get_current_user(request):
    if request.user.is_authenticated:
        return HttpResponse(json.dumps(request.user.username))
    
    return HttpResponse(status=202)    
        

def LoginUser(request, username, password):
    user = authenticate(username=username, password=password)
    
    if user is None:
        return HttpResponse(status=202)
    
    login(request, user)
    return HttpResponse(status=200)


def RegisterUser(request, username, email, password):
    userExists = User.objects.filter(username=username).exists()
    if userExists:
        return HttpResponse(status=202)
    
    emailExists = CustomUser.objects.filter(email=email).exists()
    if emailExists:
        return HttpResponse(status=201)
    
    code = ''.join(map(str, [randrange(0, 10) for i in range(6)]))
    
    send_mail('verification code', code, settings.EMAIL_HOST_USER, [email], fail_silently=False)
    #except:
    #    return HttpResponse(status=203)
    return HttpResponse(status=200)

    
    user = User.objects.create_user(username=username, password=password)
    user.save()
    
    customUser = CustomUser.objects.create(user=user, email=email, is_verificated=False, verification_code=code)
    customUser.save()
    
    user = authenticate(username=username, password=password)
    login(request, user)
    
    return HttpResponse(status=200)


def get_user_info(request):
    user = request.user
    CurrentUser =  CustomUser.objects.get(user=user)
    
    info = {
        "username": CurrentUser.user.username,
        "email": CurrentUser.email
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