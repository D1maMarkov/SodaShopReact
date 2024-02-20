from django.views.generic import View
from django.http import HttpResponse
from ..cart import Cart
import json


class AddProductInCart(View):
    def get(self, request, product_id):    
        if request.user.is_authenticated:
            cart = Cart(request)
            cart.add(product_id)
            
            return HttpResponse(status=200)
        
        return HttpResponse(status=202)


class RemoveProductFromCart(View):
    def get(self, request, product_id):
        cart = Cart(request)
        cart.remove(product_id)
        
        return HttpResponse(status=200)


class LowQuantityProduct(View):
    def get(self, request, product_id):
        cart = Cart(request)
        cart.low_quantity(product_id)

        return HttpResponse(status=200)


class GetCart(View):
    def get(self, request):
        cart = Cart(request)
        
        return HttpResponse(json.dumps(cart.all()))