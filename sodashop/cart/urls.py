from django.urls import path
from .views.cart_views import *
from .views.orders_views import *


urlpatterns = [
    path('add/<int:product_id>', add),
    path('remove/<int:product_id>', remove),
    path('low-quantity/<int:product_id>', low_quantity),
    path('get', get),
    path('get-orders', get_orders),
    path('create-order/<str:name>/<str:phone>/<str:delivery>/<str:payment>/<str:lat>/<str:lng>/<str:comment>', create_order),
]