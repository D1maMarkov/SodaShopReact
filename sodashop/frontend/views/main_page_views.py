from django.views.decorators.cache import cache_page
from django.shortcuts import render
from django.http import HttpResponse
from frontend.models import PopularProduct
from frontend.serializer import BaseProductSerializer
import json


@cache_page(15 * 60)
def index(request, *args, **kwargs):
    return render(request, "frontend/index.html")


def get_popular_products(request):
    products = [popular.product for popular in PopularProduct.objects.all()[0:6]]
    products_json = BaseProductSerializer(products, many=True).data
    
    return HttpResponse(json.dumps(products_json))
