from rest_framework import serializers
from .models import *
from frontend.models import Product
from frontend.serializer import BaseProductSerializer


class CartProductSerializer(BaseProductSerializer):
    quantity = serializers.IntegerField(default=1)
    
    class Meta:
        model = Product
        fields = BaseProductSerializer.Meta.fields + ('price', 'quantity')
    
class OrderSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()
    
    class Meta:
        model = Order
        fields = ('id', 'products', 'price', 'date', 'state')
        
    def get_products(self, order):
        return CartProductSerializer(map(lambda x: x.product, CartProduct.objects.filter(order__id=order.id)), many=True).data