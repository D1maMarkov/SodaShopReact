from django.urls import path, re_path
from .views.main_page_views import *
from .views.products_views import *


urlpatterns = [
    path('', Index.as_view()),
    path('login', Index.as_view()),
    path('catalog', Index.as_view()),
    path("confirm", Index.as_view()),
    path("profile", Index.as_view()),
    path('register', Index.as_view()),
    path('order-form', Index.as_view()),
    path('soda/<str:category>/<int:color>', Index.as_view()),
    path('get-rates/<int:product_id>', GetRates.as_view()),
    path('send-feedback/<int:product_id>/<int:rate>', SendFeedback.as_view()),
    path("get-products", GetProducts.as_view()),
    path("get-product/<str:category>/<int:color>", GetProduct.as_view()),
    path("get-popular-products", GetPopularProducts.as_view()),
    re_path(r'.*/', Index.as_view()),
]