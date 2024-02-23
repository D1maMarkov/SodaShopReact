from django.forms import BaseModelForm
from ..forms import RegistrationForm, LoginForm, ResetPasswordForm, ChangeProfileFieldsForm
from ..models.token_models import TokenToConfirmEmail, TokenToResetPassword
from django.contrib.auth import authenticate, login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from django.views.generic import View, UpdateView
from ..models.custom_user_model import CustomUser
from django.core.mail import send_mail
from django.conf import settings
from random import randrange


@method_decorator(csrf_exempt, name='dispatch')
class LoginUser(View):
    def post(self, request):
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


@method_decorator(csrf_exempt, name='dispatch')
class RegisterUser(View):
    def post(self, request):
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


@method_decorator(csrf_exempt, name='dispatch')
class ChangeFields(UpdateView):
    model = CustomUser
    form_class = ChangeProfileFieldsForm
    
    def get_object(self):
        return self.request.user

    def form_valid(self, form):
        form.save()

        return JsonResponse({
            "status": "valid"
        })

    def form_invalid(self, form):
        return JsonResponse({
            "status": "invalid",
            'errors': form.errors
        })


@method_decorator(csrf_exempt, name='dispatch')
class ResetPassword(View):
    def post(self, request):
        form = ResetPasswordForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password1"]
            
            user = CustomUser.objects.get(username=username)
            user.set_password(password)
            user.save()

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


@method_decorator(csrf_exempt, name='dispatch')
class GetUserInfo(View):  
    def post(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({
                "status": "invalid"
            })

        current_user = request.user
        
        info = {
            "username": current_user.username,
            "email": current_user.email,
            "phone": current_user.phone if current_user.phone != None else "",
            "adress": current_user.adress if current_user.adress != None else "",
        }
        
        return JsonResponse({
            "status": "valid",
            "info": info
        })


class LogoutUser(View):
    def get(self, request):
        logout(request)
        return HttpResponse(status=200)