from django.urls import path
from .views.tokens_views import *
from .views.user_views import *


urlpatterns = [
    path('login-user', login_user),
    path('register-user', register_user),
    path("send-new-code/<str:token>", send_new_code),
    path("confirm-email/<str:token>/<int:verification_code>", confirm_email),
    path("get-user-info", get_user_info),
    path("change-fields", change_fields),
    path("logout", logout_user),
    path("get-reset-token", get_reset_token),
    path("check-token", check_token_to_reset_password),
    path("reset-password", reset_password),
    path("check-confirm-email-token/<str:token>", check_confirm_email_token),
]