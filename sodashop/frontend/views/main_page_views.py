from frontend.serializer import BaseProductSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.generic import TemplateView, View
from frontend.models import PopularProduct
from django.http import HttpResponse
import json


@method_decorator(cache_page(15 * 60), name='dispatch')
class Index(TemplateView):
    template_name = "frontend/index.html"


class GetPopularProducts(View):
    def get(self, request):
        products = [popular.product for popular in PopularProduct.objects.all()[0:6]]
        products_json = BaseProductSerializer(products, many=True).data
        
        return HttpResponse(json.dumps(products_json))
