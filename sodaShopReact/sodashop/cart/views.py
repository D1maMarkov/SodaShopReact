from django.http import HttpResponse
from .cart import Cart
import json


def cart_add(request, product_id):
    if request.user.is_authenticated:
        cart = Cart(request)
        cart.cart_add(product_id)
        
        return HttpResponse(status=200)
    
    return HttpResponse(status=202)


def cart_remove(request, product_id):
    cart = Cart(request)
    product = product_id
    cart.cart_remove(product)
    
    return HttpResponse(status=200)


def cart_low_quantity(request, product_id):
    cart = Cart(request)
    cart.cart[product_id]['quantity'] -= 1
    cart.save()
    if cart.cart[product_id]['quantity'] <= 0:
        cart.cart_remove(product_id)

    return HttpResponse(status=200)


def get_cart(request):
    cart = Cart(request)
    cartJson = [product for product in cart]
 
    return HttpResponse(json.dumps(cartJson))