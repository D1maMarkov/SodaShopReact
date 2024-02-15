from user.models.custum_user_model import CustomUser
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from frontend.serializer import *
from frontend.models import *
import json


def send_feedback(request, product_id, rate):
    if not request.user.is_authenticated:
        return JsonResponse({
            "status": "invalid"
        })

    user = User.objects.get(username=request.user.get_username())
    custom_user = CustomUser.objects.get(user=user)

    Rate.objects.create(product=Product.objects.get(id=product_id), rate=rate, user=custom_user)

    return JsonResponse({
        "status": "valid"
    })


def get_rates(request, product_id):
    feedback_left = False

    if request.user.is_authenticated:
        user = User.objects.get(username=request.user.get_username())
        custom_user = CustomUser.objects.get(user=user)
        rate_exists = Product.objects.get(id=product_id).rate_set.all().filter(user=custom_user).exists()

        if rate_exists:
            feedback_left = True

    rates = list(map(lambda x: x.rate, Product.objects.get(id=product_id).rate_set.all()))
    rate = {"value": round(sum(rates) / max(1, len(rates)), 1), "count": len(rates)}
    
    response = {
        "rate": rate,
        "left": feedback_left
    }
    
    return JsonResponse(response)

def get_products(request):
    products = BaseProductSerializer(Product.objects.all(), many=True).data

    return HttpResponse(json.dumps(products))


def get_product(request, category, color):
    products = Product.objects.filter(category=category)
        
    for i in range(len(products)):
        if products[i].id == color:
            products = products[i::] + products[0: i]
            break

    if len(products) < 4:
        products *= 4
        products = products[0:4]
    
    products_json = ProductSerializer(products, many=True).data
    
    return HttpResponse(json.dumps(products_json))