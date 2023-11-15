from django.urls import path, re_path
from .views import *


urlpatterns = [
    path('', index),
    path('catalog', index),
    path('orderForm', index),
    path('soda/<category>/<color>', index),
    path('login', index),
    path('get_rates/<product_id>', get_rates),
    path('send_feedback/<product_id>/<rate>', send_feedback),
    path('register', index),
    path("confirm", index),
    path("profile", index),
    path("getProducts", getProducts),
    path("getProduct/<category>/<color>", getProduct),
    path('getOrders', getOrders),
    path("getPopularProducts", getPopularProducts),
    path('createOrder/<name>/<phone>/<delivery>/<payment>/<lat>/<lng>/<comment>', createOrder),
    re_path(r'.*/', index),
]
