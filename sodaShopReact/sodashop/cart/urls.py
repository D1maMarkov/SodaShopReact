from django.urls import path
from .views import *


urlpatterns = [
    path('cart_add/<product_id>', cart_add),
    path('cart_remove/<product_id>', cart_remove),
    path('cart_low_quantity/<product_id>', cart_low_quantity),
    path('get_cart', get_cart),
]
