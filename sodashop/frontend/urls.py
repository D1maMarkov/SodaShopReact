from django.urls import path, re_path
from .views import *


urlpatterns = [
    path('', index),
    path('login', index),
    path('catalog', index),
    path("confirm", index),
    path("profile", index),
    path('register', index),
    path('order-form', index),
    path('soda/<category>/<color>', index),
    path('get-rates/<product_id>', get_rates),
    path('send-feedback/<product_id>/<rate>', send_feedback),
    path("get-products", get_products),
    path("get-product/<category>/<color>", get_product),
    path('get-orders', get_orders),
    path("get-popular-products", get_popular_products),
    path('create-order/<name>/<phone>/<delivery>/<payment>/<lat>/<lng>/<comment>', create_order),
    re_path(r'.*/', index),
]
