from rest_framework import serializers
from .models import *

        
class BaseProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ('id', 'name','description', 'image', 'category') 

    def get_image(self, product):
        return product.image.url


class ProductSerializer(BaseProductSerializer):
    class Meta:
        model = Product
        fields = BaseProductSerializer.Meta.fields + ('price', 'blob1', 'blob2', 'gradient')
        