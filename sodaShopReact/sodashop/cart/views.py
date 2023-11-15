from django.http import HttpResponse
from .cart import Cart
import json
from django_ratelimit.decorators import ratelimit


@ratelimit(key='ip', rate='15/m', block=True)
def cart_add(request, product_id):
    if request.user.is_authenticated:
        cart = Cart(request)
        cart.cart_add(product_id)
        
        return HttpResponse(status=200)
    
    return HttpResponse(status=202)


@ratelimit(key='ip', rate='15/m', block=True)
def cart_remove(request, product_id):
    cart = Cart(request)
    product = product_id
    cart.cart_remove(product)
    
    return HttpResponse(status=200)


@ratelimit(key='ip', rate='15/m', block=True)
def cart_low_quantity(request, product_id):
    cart = Cart(request)
    cart.cart[product_id]['quantity'] -= 1
    cart.save()
    if cart.cart[product_id]['quantity'] <= 0:
        cart.cart_remove(product_id)

    return HttpResponse(status=200)


@ratelimit(key='ip', rate='15/m', block=True)
def get_cart(request):
    cart = Cart(request)
    cartJson = [product for product in cart]
 
    return HttpResponse(json.dumps(cartJson))