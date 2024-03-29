import json

from django.http import HttpResponse, JsonResponse
from django.views.generic import CreateView, View

from frontend.models import Product, Rate
from frontend.serializer import BaseProductSerializer, ProductSerializer


class SendFeedback(CreateView):
    def get(self, request, product_id, rate):
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        Rate.objects.create(product=Product.objects.get(id=product_id), rate=rate, user=request.user)

        return HttpResponse(status=201)


class GetRates(View):
    def get(self, request, product_id):
        feedback_left = False
        rates = Product.objects.prefetch_related("rates").get(id=product_id).rates

        if request.user.is_authenticated:
            user = request.user
            rate_exists = rates.filter(user=user).exists()

            if rate_exists:
                feedback_left = True

        rates = list(map(lambda x: x.rate, rates.all()))
        rate = {"value": round(sum(rates) / max(1, len(rates)), 1), "count": len(rates)}

        response = {"rate": rate, "left": feedback_left}

        return JsonResponse(response)


class GetProducts(View):
    def get(self, request):
        products = BaseProductSerializer(Product.objects.all(), many=True).data

        return HttpResponse(json.dumps(products))


class GetProduct(View):
    def get(self, request, category, color):
        products = Product.objects.filter(category=category)

        for i in range(len(products)):
            if products[i].id == color:
                products = products[i::] + products[0:i]
                break

        if len(products) < 4:
            products *= 4
            products = products[0:4]

        products_json = ProductSerializer(products, many=True).data

        return HttpResponse(json.dumps(products_json))
