from django.urls import path
from .views import *


urlpatterns = [
    path('add/<product_id>', add),
    path('remove/<product_id>', remove),
    path('low-quantity/<product_id>', low_quantity),
    path('get', get),
]
