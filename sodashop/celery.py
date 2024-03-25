import os
from datetime import timedelta

from celery import Celery
from django.conf import settings

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sodashop.settings")

app = Celery("sodashop")
app.conf.enable_utc = False
app.config_from_object(settings, namespace="CELERY")


app.autodiscover_tasks()

app.conf.beat_schedule = {
    "delete-expired-tokens-to-reset-password": {
        "task": "user.tasks.delete_expired_tokens_to_reset_password",
        "schedule": timedelta(days=1),
    },
    "delete-expired-tokens-to-confirm-email": {
        "task": "user.tasks.delete_expired_tokens_to_confirm_email",
        "schedule": timedelta(days=1),
    },
}


# celery -A sodashop worker --pool=solo -l info
# celery -A sodashop beat -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler
