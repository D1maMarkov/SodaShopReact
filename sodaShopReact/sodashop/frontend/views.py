from django.forms.models import model_to_dict
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import render
from user.models import CustomUser
from django.conf import settings
from cart.cart import Cart
from datetime import date
from .models import *
import json
import telebot


bot = telebot.TeleBot(settings.TELEGRAM_API_TOKEN)

def index(request, *args, **kwargs): 
    return render(request, "frontend/index.html")


def get_popular_products(request):
    populars = sorted(list(PopularProduct.objects.all()), key = lambda x: x.code, reverse = True)
    products = []
    
    for i in range(min(6, len(populars))):
        product = model_to_dict(populars[i])
        product["product"] = model_to_dict(populars[i].product)
        product["product"]["image"] = populars[i].product.image.url
        products.append(product)
    
    return HttpResponse(json.dumps(products))


def get_rates(request, product_id):
    rates = list(map(model_to_dict, Product.objects.get(id=int(product_id)).rate_set.all()))
    rate = {"value": round(sum([i["rate"] for i in rates]) / max(1, len(rates)), 1), "count": len(rates)}
    
    return HttpResponse(json.dumps(rate))

    
def get_orders(request):
    user = request.user
    CurrentUser =  CustomUser.objects.get(user=user)

    orders = sorted(list(Order.objects.filter(user=CurrentUser)), key = lambda x: x.curent_date, reverse = True)
    orders_dict = []
    
    for order in orders:
        order_json = model_to_dict(order)
        products = order.cartproduct_set.all()
        p = list(map(model_to_dict, products))
   
        for i in range(len(p)):
            p[i]["product"] = model_to_dict(Product.objects.get(id=p[i]["product"]))
            p[i]["product"]["image"] = Product.objects.get(id=p[i]["product"]["id"]).image.url
            
        order_json["orderlist"] = p
        orders_dict.append(order_json)
    
    return HttpResponse(json.dumps(orders_dict))
    

def create_order(request, name, phone, delivery, payment, lat, lng, comment):
    cart = Cart(request)
    
    order = Order.objects.create(
        price=cart.get_total_price(), 
        user=CustomUser.objects.get(user=request.user), 
        curent_date=date.today(),
        delivery=delivery,
        payment=payment,
        comment=(comment if comment != "NoComment" else ""),
        lat = lat,
        lng = lng,
        state = "In the warehouse"
    )
    
    message = "На сайте новый заказ"
    bot.send_message(settings.MY_TELEGRAM_ID, message)
    
    order.save()
    
    user = CustomUser.objects.get(user=request.user)
    user.name = name
    user.phone = phone
    user.save()
    
    for item in cart.cart.values():
        product = PopularProduct.objects.filter(product=Product.objects.get(name=item["product"]["name"]))
        if len(product) > 0:
            product[0].code += item['quantity']
            product[0].save()
        else:
            product = PopularProduct.objects.create(product=Product.objects.get(name=item["product"]["name"]), code=item['quantity'])
            product.save()
            
        new_cart_product = CartProduct.objects.create(order=order, product=Product.objects.get(name=item["product"]["name"]), quantity=item['quantity'])
        new_cart_product.save()
        
    cart.clear()
    cart.save()

    return HttpResponse(status=200)
 
    
def send_feedback(request, product_id, rate):
    if not request.user.is_authenticated:
        return HttpResponse(status = 201)
    
    user = User.objects.get(username=request.user.get_username())
    
    customUser = CustomUser.objects.get(user=user)
    
    feedback_left = False
    for obj in Rate.objects.all():
        if obj.product.id == int(product_id) and obj.user == customUser:
            feedback_left = True

    if feedback_left:
        return HttpResponse(status=202)

    new_rate = Rate.objects.create(product=Product.objects.get(id=int(product_id)), rate=int(rate), user=customUser)
    new_rate.save()

    return HttpResponse(status=200)

def get_products(request):
    products = list(Product.objects.all())
    products_json = []
    for i in range(len(products)):
        product = model_to_dict(products[i])
        product["image"] = products[i].image.url
        products_json.append(product)
    
    return HttpResponse(json.dumps(products_json))


def get_product(request, category, color):
    products = list(Product.objects.filter(category=category))
    
    products_json = []
    for i in range(len(products)):
        product = model_to_dict(products[i])
        product["image"] = products[i].image.url
        products_json.append(product)
        
    for i in range(len(products)):
        if products_json[i]["id"] == int(color):
            products_json = products_json[i::] + products_json[0: i]
        
    if len(products_json) < 4:
        products_json *= 4
        products_json = products_json[0:4]
        
    
    return HttpResponse(json.dumps(products_json))
        
        
    
    