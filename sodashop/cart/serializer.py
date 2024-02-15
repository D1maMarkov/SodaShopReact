from rest_framework import serializers
from .models.models import CartProduct, Order
from frontend.serializer import BaseProductSerializer
from frontend.models import Product


class CartProductSerializer(BaseProductSerializer):
    quantity = serializers.IntegerField(default=1)
    
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'image', 'quantity', 'price')        


class OrderProductSerializer(BaseProductSerializer):
    name = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = CartProduct
        fields = ('id', 'name', 'description', 'image', 'quantity')

    def get_name(self, cart_product):
        return cart_product.product.name
    
    def get_description(self, cart_product):
        return cart_product.product.description

    def get_image(self, cart_product):
        return cart_product.product.image.url


class OrderSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ('id', 'products', 'price', 'date', 'state')

    def get_products(self, order):
        return OrderProductSerializer(CartProduct.objects.filter(order__id=order.id), many=True).data