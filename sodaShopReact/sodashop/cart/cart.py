from django.conf import settings
from frontend.models import Product
from django.forms.models import model_to_dict


class Cart(object):
    def __init__(self, request):
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)
        if not cart:
            cart = self.session[settings.CART_SESSION_ID] = {}

        #cart = self.session[settings.CART_SESSION_ID] = {}
        self.cart = cart


    def cart_add(self, product_id):  
        product_obj = Product.objects.get(id=product_id)
        product = model_to_dict(product_obj)
        product["image"] = product_obj.image.url
       
        if product_id not in self.cart:
            self.cart[product_id] = {'quantity': 1, "product": product}
            
        else:
            self.cart[product_id]['quantity'] += 1
      
        self.save()


    def save(self):
        self.session.modified = True

    def cart_remove(self, product_id):
        if product_id in self.cart:
            del self.cart[product_id]
            self.save()


    def get_total_price(self):
        return sum(int(self.cart[item]["product"]['price']) * self.cart[item]['quantity'] for item in self.cart)

    def clear(self):
        del self.session[settings.CART_SESSION_ID]
        self.save()
