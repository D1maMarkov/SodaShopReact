from django.urls import path
from .views.cart_views import *
from .views.orders_views import *


urlpatterns = [
    path('add/<str:product_id>', add),
    path('remove/<str:product_id>', remove),
    path('low-quantity/<str:product_id>', low_quantity),
    path('get', get),
    path('get-orders', get_orders),
    path('create-order', create_order),
]