from django.urls import path
from .views import *


urlpatterns = [
    path('cart-add/<product_id>', cart_add),
    path('cart-remove/<product_id>', cart_remove),
    path('cart-low-quantity/<product_id>', cart_low_quantity),
    path('get-cart', get_cart),
]
