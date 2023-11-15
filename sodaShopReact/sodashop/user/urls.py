from django.urls import path
from .views import *


urlpatterns = [
    path('LoginUser/<username>/<password>', LoginUser),
    path('get_current_user', get_current_user),
    path('RegisterUser/<username>/<email>/<password>', RegisterUser),
    path("sendNewCode", sendNewCode),
    path("confirmEmail/<verification_code>", confirmEmail),
    path("get_user_info", get_user_info),
    path("logout", Logout),
]