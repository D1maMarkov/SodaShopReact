from datetime import datetime, timedelta

from dateutil.tz import tzoffset
from django.conf import settings
from django.core.mail import send_mail

from sodashop.celery import app

from .models.token_models import TokenToConfirmEmail, TokenToResetPassword

timezone_offset = -8.0  # Pacific Standard Time (UTC−08:00)
tzinfo = tzoffset(None, timezone_offset * 3600)  # offset in seconds


@app.task()
def delete_expired_tokens_to_reset_password():
    end_date = datetime.now(tzinfo) - timedelta(hours=1)

    TokenToResetPassword.objects.exclude(created_at__lt=end_date).delete()


@app.task()
def delete_expired_tokens_to_confirm_email():
    end_date = datetime.now(tzinfo) - timedelta(hours=1)

    TokenToConfirmEmail.objects.exclude(created_at__lt=end_date).delete()


@app.task()
def send_email_to_confirm_email(code, users_email):
    send_mail("verification code", code, settings.EMAIL_HOST_USER, [users_email], fail_silently=False)


@app.task()
def send_email_to_reset_password(domain, token, users_email):
    text = f"""
    password reset link\n
    {domain}/reset-password/{token} \n
    A password reset request has been sent to your email from the SodaStockOnlineStore website. If it wasn't you, please ignore this email
    """

    send_mail("password reset link", text, settings.EMAIL_HOST_USER, [users_email])


@app.task()
def send_new_verification_code(new_code, users_mail):
    send_mail("verification code", new_code, settings.EMAIL_HOST_USER, [users_mail])
