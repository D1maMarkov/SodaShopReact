from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import render
from user.models import CustomUser
from django.conf import settings
from cart.cart import Cart
from .models import *
import json
import telebot
from .serializer import *
from django.views.decorators.cache import cache_page


bot = telebot.TeleBot(settings.TELEGRAM_API_TOKEN)

@cache_page(15 * 60)
def index(request, *args, **kwargs):
    return render(request, "frontend/index.html")


def get_popular_products(request):
    products = [popular.product for popular in PopularProduct.objects.all()[0:6]]
    products_json = BaseProductSerializer(products, many=True).data
    
    return HttpResponse(json.dumps(products_json))


def get_orders(request):
    user = request.user
    current_user =  CustomUser.objects.get(user=user)

    orders = Order.objects.filter(user=current_user)
    orders_json = OrderSerializer(orders, many=True).data
    
    return HttpResponse(json.dumps(orders_json))


def create_order(request, name, phone, delivery, payment, lat, lng, comment):
    cart = Cart(request)

    order = Order.objects.create(
        price=cart.get_total_price(), 
        user=CustomUser.objects.get(user=request.user), 
        delivery=delivery,
        payment=payment,
        comment=(comment if comment != "NoComment" else ""),
        lat=lat,
        lng=lng,
    )
    
    message = "На сайте новый заказ"
    bot.send_message(settings.MY_TELEGRAM_ID, message)
    
    CustomUser.objects.filter(user=request.user).update(name=name, phone=phone)
    
    for item in cart:
        product = PopularProduct.objects.filter(product=Product.objects.get(name=item["name"]))
        if len(product) > 0:
            product[0].code += item['quantity']
            product[0].save()
        else:
            product = PopularProduct.objects.create(product=Product.objects.get(name=item["name"]), code=item['quantity'])
  
        CartProduct.objects.create(order=order, product=Product.objects.get(name=item["name"]), quantity=item['quantity'])
        
    cart.clear()

    return HttpResponse(status=200)

    
def send_feedback(request, product_id, rate):
    if not request.user.is_authenticated:
        return HttpResponse(status=201)

    user = User.objects.get(username=request.user.get_username())
    custom_user = CustomUser.objects.get(user=user)

    Rate.objects.create(product=Product.objects.get(id=product_id), rate=rate, user=custom_user)

    return HttpResponse(status=200)


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
    
    return HttpResponse(json.dumps(response))

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