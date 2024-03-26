from random import randrange

from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import UpdateView, View

from user.forms import (
    ChangeProfileFieldsForm,
    LoginForm,
    RegistrationForm,
    ResetPasswordForm,
)
from user.models.custom_user_model import CustomUser
from user.models.token_models import TokenToConfirmEmail, TokenToResetPassword
from user.tasks import send_email_to_confirm_email


@method_decorator(csrf_exempt, name="dispatch")
class LoginUser(View):
    def post(self, request):
        form = LoginForm(request.POST)
        if form.is_valid():
            user = authenticate(username=form.cleaned_data["username"], password=form.cleaned_data["password"])

            login(request, user)

            return JsonResponse(
                {
                    "status": "valid",
                }
            )

        else:
            return JsonResponse({"status": "invalid", "errors": form.errors})


@method_decorator(csrf_exempt, name="dispatch")
class RegisterUser(View):
    def post(self, request):
        form = RegistrationForm(request.POST)
        if form.is_valid():
            code = "".join(map(str, [randrange(0, 10) for i in range(6)]))

            send_email_to_confirm_email.delay(code, form.cleaned_data["email"])

            token_value = "".join(map(str, [randrange(0, 10) for i in range(32)]))

            TokenToConfirmEmail.objects.create(
                username=form.cleaned_data["username"],
                password=form.cleaned_data["password"],
                email=form.cleaned_data["email"],
                token=token_value,
                code=code,
            )

            return JsonResponse({"status": "valid", "message": token_value})

        else:
            return JsonResponse({"status": "invalid", "errors": form.errors})


@method_decorator(csrf_exempt, name="dispatch")
class ChangeFields(UpdateView):
    model = CustomUser
    form_class = ChangeProfileFieldsForm

    def get_object(self):
        return self.request.user

    def form_valid(self, form):
        form.save()

        return JsonResponse({"status": "valid"})

    def form_invalid(self, form):
        return JsonResponse({"status": "invalid", "errors": form.errors})


@method_decorator(csrf_exempt, name="dispatch")
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

            return JsonResponse(
                {
                    "status": "valid",
                }
            )

        else:
            return JsonResponse({"status": "invalid", "errors": form.errors})


@method_decorator(csrf_exempt, name="dispatch")
class GetUserInfo(View):
    def post(self, request):
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        current_user = request.user

        info = {
            "username": current_user.username,
            "email": current_user.email,
            "phone": current_user.phone if current_user.phone is not None else "",
            "adress": current_user.adress if current_user.adress is not None else "",
        }

        return JsonResponse({"info": info}, status=200)


class LogoutUser(View):
    def get(self, request):
        logout(request)
        return HttpResponse(status=200)
