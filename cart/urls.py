from django.urls import path

from .views.cart_views import (
    AddProductInCart,
    GetCart,
    LowQuantityProduct,
    RemoveProductFromCart,
)
from .views.orders_views import CreateOrder, GetOrders

urlpatterns = [
    path("add/<str:product_id>", AddProductInCart.as_view()),
    path("remove/<str:product_id>", RemoveProductFromCart.as_view()),
    path("low-quantity/<str:product_id>", LowQuantityProduct.as_view()),
    path("get", GetCart.as_view()),
    path("get-orders", GetOrders.as_view()),
    path("create-order", CreateOrder.as_view()),
]
