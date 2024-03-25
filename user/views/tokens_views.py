import json
from datetime import datetime, timedelta
from random import randrange

from dateutil.tz import tzoffset
from django.contrib.auth import authenticate, login
from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View

from user.forms import PasswordResetRequestForm
from user.models.custom_user_model import CustomUser
from user.models.token_models import TokenToConfirmEmail, TokenToResetPassword
from user.tasks import send_email_to_reset_password, send_new_verification_code
from utils.user_errors import errors
from utils.user_success_mesages import success_messages

timezone_offset = -8.0  # Pacific Standard Time (UTC−08:00)
tzinfo = tzoffset(None, timezone_offset * 3600)  # offset in seconds


class CheckConfirmEmailToken(View):
    def get(self, request, token):
        start_date = datetime.now(tzinfo) - timedelta(hours=1)
        end_date = datetime.now(tzinfo)

        token_exists = TokenToConfirmEmail.objects.filter(token=token).exists()
        if not token_exists:
            return JsonResponse({"status": "invalid", "message": errors["confirm_email_incorrect_url"]})

        tokens = TokenToConfirmEmail.objects.filter(created_at__range=[start_date, end_date])
        token_exists = tokens.filter(token=token)

        if not token_exists:
            return JsonResponse(
                {
                    "status": "invalid",
                    "message": errors["confirm_link_expired"],
                }
            )

        return JsonResponse({"status": "valid"})


@method_decorator(csrf_exempt, name="dispatch")
class GetResetToken(View):
    def post(self, request):
        form = PasswordResetRequestForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data["email"]
            user_exists = CustomUser.objects.filter(email=email).exists()
            if not user_exists:
                return JsonResponse({"status": "invalid", "errors": {"email": [errors["users_email_not_exist"]]}})

            current_user = CustomUser.objects.get(email=email)

            start_date = datetime.now(tzinfo) - timedelta(hours=1)
            end_date = datetime.now(tzinfo)

            token_exists = (
                TokenToResetPassword.objects.filter(created_at__range=[start_date, end_date])
                .filter(user=current_user)
                .exists()
            )

            if token_exists:
                return JsonResponse({"status": "valid", "message": errors["reset_link_already_sent"]})

            token = TokenToResetPassword.objects.create(
                user=current_user, token="".join([chr(randrange(97, 123)) for i in range(32)])
            )

            send_email_to_reset_password.delay(token.token, current_user.email)

            return JsonResponse({"status": "valid", "message": success_messages["reset_sent"]})
        else:
            return JsonResponse({"status": "invalid", "errors": form.errors})


@method_decorator(csrf_exempt, name="dispatch")
class CheckTokenToResetPassword(View):
    def post(self, request):
        start_date = datetime.now(tzinfo) - timedelta(hours=1)
        end_date = datetime.now(tzinfo)

        token_exists = TokenToResetPassword.objects.filter(token=request.POST["token"]).exists()
        if not token_exists:
            return JsonResponse({"status": "invalid", "message": errors["reset_link_invalid"]})

        tokens = TokenToResetPassword.objects.filter(created_at__range=[start_date, end_date])
        token_exists = tokens.filter(token=request.POST["token"])
        if not token_exists:
            return JsonResponse(json.dumps({"status": "invalid", "message": errors["reset_link_expired"]}))

        token = tokens.get(token=request.POST["token"])

        return JsonResponse({"status": "valid", "message": token.user.username})


class ConfirmEmail(View):
    def get(self, request, token, verification_code):
        token_obj = TokenToConfirmEmail.objects.get(token=token)
        code = token_obj.code

        if code == verification_code:
            user = CustomUser.objects.create_user(
                username=token_obj.username, password=token_obj.password, email=token_obj.email
            )

            user = authenticate(username=token_obj.username, password=token_obj.password)
            login(request, user)

            token_obj.delete()

            return JsonResponse({"status": "valid"})
        else:
            return JsonResponse({"status": "invalid", "message": errors["incorrect_emial_code"]})


class SendNewCode(View):
    def get(self, request, token):
        new_code = "".join(map(str, [randrange(0, 10) for i in range(6)]))

        token_obj = TokenToConfirmEmail.objects.filter(token=token)
        token_obj.update(code=new_code)

        users_email = token_obj.first().email

        send_new_verification_code.delay(new_code, users_email)

        return HttpResponse(status=200)
