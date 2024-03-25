from django.conf import settings

from frontend.models import Product

from .serializer import CartProductSerializer


class Cart:
    def __init__(self, request):
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)
        if not cart:
            cart = self.session[settings.CART_SESSION_ID] = {}

        # cart = self.session[settings.CART_SESSION_ID] = {}
        self.cart = cart

    def __iter__(self):
        cart = self.cart.copy()

        yield from cart.values()

    def all(self):
        return list(self.cart.values())

    def add(self, product_id):
        product = CartProductSerializer(Product.objects.get(id=product_id)).data

        if product_id not in self.cart:
            self.cart[product_id] = product

        else:
            self.cart[product_id]["quantity"] += 1

        self.save()

    def remove(self, product_id):
        if product_id in self.cart:
            del self.cart[product_id]
            self.save()

    def low_quantity(self, product_id):
        self.cart[product_id]["quantity"] -= 1

        if self.cart[product_id]["quantity"] <= 0:
            self.remove(product_id)

        self.save()

    def get_total_price(self):
        return sum(item["price"] * item["quantity"] for item in self)

    def clear(self):
        del self.session[settings.CART_SESSION_ID]
        self.save()

    def save(self):
        self.session.modified = True
