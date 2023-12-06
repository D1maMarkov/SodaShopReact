from django.urls import path
from .views import *


urlpatterns = [
    path('LoginUser', LoginUser),
    path('RegisterUser', RegisterUser),
    path("sendNewCode", sendNewCode),
    path("confirmEmail/<verification_code>", confirmEmail),
    path("get_user_info", get_user_info),
    path("changeFields", changeFields),
    path("logout", Logout),
    path("GetResetToken/<email>", GetResetToken),
    path("CheckToken", CheckToken),
    path("ResetPassword", ResetPassword),
]