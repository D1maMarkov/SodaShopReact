from django.urls import path, re_path
from .views.main_page_views import *
from .views.products_views import *


urlpatterns = [
    path('', index),
    path('login', index),
    path('catalog', index),
    path("confirm", index),
    path("profile", index),
    path('register', index),
    path('order-form', index),
    path('soda/<str:category>/<int:color>', index),
    path('get-rates/<int:product_id>', get_rates),
    path('send-feedback/<int:product_id>/<int:rate>', send_feedback),
    path("get-products", get_products),
    path("get-product/<str:category>/<int:color>", get_product),
    path("get-popular-products", get_popular_products),
    re_path(r'.*/', index),
]