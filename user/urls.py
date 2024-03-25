from django.urls import path

from .views.tokens_views import (
    CheckConfirmEmailToken,
    CheckTokenToResetPassword,
    ConfirmEmail,
    GetResetToken,
    SendNewCode,
)
from .views.user_views import (
    ChangeFields,
    GetUserInfo,
    LoginUser,
    LogoutUser,
    RegisterUser,
    ResetPassword,
)

urlpatterns = [
    path("login-user", LoginUser.as_view()),
    path("register-user", RegisterUser.as_view()),
    path("send-new-code/<str:token>", SendNewCode.as_view()),
    path("confirm-email/<str:token>/<int:verification_code>", ConfirmEmail.as_view()),
    path("get-user-info", GetUserInfo.as_view()),
    path("change-fields", ChangeFields.as_view()),
    path("logout", LogoutUser.as_view()),
    path("get-reset-token", GetResetToken.as_view()),
    path("check-token", CheckTokenToResetPassword.as_view()),
    path("reset-password", ResetPassword.as_view()),
    path("check-confirm-email-token/<str:token>", CheckConfirmEmailToken.as_view()),
]
