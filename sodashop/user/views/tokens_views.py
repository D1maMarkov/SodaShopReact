from user.models.token_models import TokenToConfirmEmail, TokenToResetPassword
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.http import HttpResponse, JsonResponse
from user.forms import PasswordResetRequestForm
from utils.user_success_mesages import *
from datetime import datetime, timedelta
from django.core.mail import send_mail
from django.views.generic import View
from dateutil.tz import tzoffset
from django.conf import settings
from utils.user_errors import *
from random import randrange
from ..models import *
import json


timezone_offset = -8.0  # Pacific Standard Time (UTC−08:00)
tzinfo = tzoffset(None, timezone_offset * 3600)  # offset in seconds

class CheckConfirmEmailToken(View):
    def get(self, request, token):
        start_date = datetime.now(tzinfo) - timedelta(hours=1)
        end_date = datetime.now(tzinfo)

        token_exists = TokenToConfirmEmail.objects.filter(token=token).exists()
        if not token_exists:
            return JsonResponse({
                "status": "invalid",
                "message": errors["confirm_email_incorrect_url"]
            })

        tokens = TokenToConfirmEmail.objects.filter(created_at__range=[start_date, end_date])
        token_exists = tokens.filter(token=token)

        if not token_exists:
            return JsonResponse({
                "status": "invalid",
                "message": errors["confirm_link_expired"],
            })

        return JsonResponse({
            "status": "valid"
        })

@method_decorator(csrf_exempt, name='dispatch')
class GetResetToken(View):
    def post(self, request):
        form = PasswordResetRequestForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data["email"]
            user_exists = CustomUser.objects.filter(email=email).exists()
            if not user_exists:
                return JsonResponse({
                    "status": "invalid",
                    "errors": {
                        "email": [errors["users_email_not_exist"]]
                    }
                })

            current_user = CustomUser.objects.get(email=email)

            start_date = datetime.now(tzinfo) - timedelta(hours = 1)
            end_date = datetime.now(tzinfo)

            if TokenToResetPassword.objects.exclude(created_at__range=[start_date, end_date]).filter(user=current_user).exists():
                TokenToResetPassword.objects.exclude(created_at__range=[start_date, end_date]).get(user=current_user).delete()

            token_exists = TokenToResetPassword.objects.filter(created_at__range=[start_date, end_date]).filter(user=current_user).exists()

            if token_exists:
                return JsonResponse({
                    "status": "valid",
                    "message": errors["reset_link_already_sent"]
                })

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

            return JsonResponse({
                "status": "valid",
                "message": success_messages["reset_sent"]
            })
        else:
            return JsonResponse({
                "status": "invalid",
                "errors": form.errors
            })


@method_decorator(csrf_exempt, name='dispatch')
class CheckTokenToResetPassword(View):
    def post(self, request):    
        start_date = datetime.now(tzinfo) - timedelta(hours = 1)
        end_date = datetime.now(tzinfo)
        
        token_exists = TokenToResetPassword.objects.filter(token = request.POST["token"]).exists()
        if not token_exists:
            return JsonResponse({
                "status": "invalid",
                "message": errors["reset_link_invalid"]
            })
        
        tokens = TokenToResetPassword.objects.filter(created_at__range=[start_date, end_date])
        token_exists = tokens.filter(token=request.POST["token"])
        if not token_exists:
            return JsonResponse(json.dumps({
                "status": "invalid",
                "message": errors["reset_link_expired"]
                })
            )
        
        token = tokens.get(token=request.POST["token"])

        return JsonResponse({
            "status": "valid",
            "message": token.user.username
        })
    

class ConfirmEmail(View):
    def get(self, request, token, verification_code):
        token_obj = TokenToConfirmEmail.objects.get(token=token)
        code = token_obj.code
        
        if code == verification_code:
            user = CustomUser.objects.create_user(
                username=token_obj.username, 
                password=token_obj.password,
                email=token_obj.email
            )
            
            user = authenticate(username=token_obj.username, password=token_obj.password)
            login(request, user)
            
            token_obj.delete()
            
            return JsonResponse({
                "status": "valid"
            })
        else:
            return JsonResponse({
                "status": "invalid",
                "message": errors["incorrect_emial_code"]
                }
            )


class SendNewCode(View):
    def get(self, request, token):
        new_code = ''.join(map(str, [randrange(0, 10) for i in range(6)]))

        token_obj = TokenToConfirmEmail.objects.filter(token=token)
        token_obj.update(code=new_code)

        send_mail('verification code', new_code, settings.EMAIL_HOST_USER, [token_obj.first().email])

        return HttpResponse(status=200)