from django.http import HttpResponse
from ..cart import Cart
import json


def add(request, product_id):    
    if request.user.is_authenticated:
        cart = Cart(request)
        cart.add(product_id)
        
        return HttpResponse(status=200)
    
    return HttpResponse(status=202)


def remove(request, product_id):
    cart = Cart(request)
    cart.remove(product_id)
    
    return HttpResponse(status=200)


def low_quantity(request, product_id):
    cart = Cart(request)
    cart.low_quantity(product_id)

    return HttpResponse(status=200)


def get(request):
    cart = Cart(request)
    
    return HttpResponse(json.dumps(cart.all()))