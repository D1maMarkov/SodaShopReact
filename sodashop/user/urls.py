from django.urls import path
from .views import *


urlpatterns = [
    path('login-user', login_user),
    path('register-user', register_user),
    path("send-new-code/<token>", send_new_code),
    path("confirm-email/<token>/<int:verification_code>", confirm_email),
    path("get-user-info", get_user_info),
    path("change-fields", change_fields),
    path("logout", logout_user),
    path("get-reset-token/<email>", get_reset_token),
    path("check-token", check_token),
    path("reset-password", reset_password),
    path("check-confirm-email-token/<token>", check_confirm_email_token),
]