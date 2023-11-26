from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.models import User
from cart.cart import Cart
from .models import *
import json
from django.forms.models import model_to_dict
from datetime import date
from user.models import CustomUser
import telepot
from django.conf import settings


telegramBot = telepot.Bot(settings.TELEGRAM_API_TOKEN)


def index(request, *args, **kwargs): 
    return render(request, "frontend/index.html")


def getPopularProducts(request):
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

    
def getOrders(request):
    user = request.user
    CurrentUser =  CustomUser.objects.get(user=user)

    orders = list(Order.objects.filter(user=CurrentUser))
    orders_dict = []
    
    for order in orders:
        anOrder = model_to_dict(order)
        products = order.cartproduct_set.all()
        p = list(map(model_to_dict, products))
   
        for i in range(len(p)):
            p[i]["product"] = model_to_dict(Product.objects.get(id=p[i]["product"]))
            p[i]["product"]["image"] = Product.objects.get(id=p[i]["product"]["id"]).image.url
            
        anOrder["orderlist"] = p
        orders_dict.append(anOrder)
    
    return HttpResponse(json.dumps(orders_dict))
    

def createOrder(request, name, phone, delivery, payment, lat, lng, comment):
    cart = Cart(request)

    
    order = Order.objects.create(
        price=cart.get_total_price(), 
        user=CustomUser.objects.get(user=request.user), 
        curent_date=date.today(),
        delivery=delivery,
        payment=payment,
        comment=(comment if comment != "NoComment" else ""),
        lat = lat,
        lng = lng
    )
    
    order.save()
    
    user = CustomUser.objects.get(user=request.user)
    user.name = name
    user.phone = phone
    user.save()
    
    for item in cart:
        product = PopularProduct.objects.filter(product=Product.objects.get(name=item["product"]["name"]))
        if len(product) > 0:
            product[0].code += item['quantity']
            product[0].save()
        else:
            product = PopularProduct.objects.create(product=Product.objects.get(name=item["product"]["name"]), code=item['quantity'])
            product.save()
            
        newCartProduct = CartProduct.objects.create(order=order, product=Product.objects.get(name=item["product"]["name"]), quantity=item['quantity'])
        newCartProduct.save()
        
    cart.clear()
    cart.save()
    
    message = "На сайте новый заказ" + "\n" + "Пользователь: " + order.user.name + "\n" +  "Цена: " + str(order.price) + " $"
    telegramBot.sendMessage(settings.MY_TELEGRAM_ID, message, parse_mode="Markdown")

    return HttpResponse(status=200)
 
    
def send_feedback(request, product_id, rate):
    user = User.objects.get(username=request.user.get_username())
    
    customUser = CustomUser.objects.get(user=user)
    
    feedback_left = False
    for obj in Rate.objects.all():
        if obj.product.id == int(product_id) and obj.user == customUser:
            feedback_left = True

    if feedback_left:
        return HttpResponse(status=202)

    newrate = Rate.objects.create(product=Product.objects.get(id=int(product_id)), rate=int(rate), user=customUser)
    newrate.save()

    return HttpResponse(status=200)

def getProducts(request):
    products = list(Product.objects.all())
    productsJson = []
    for i in range(len(products)):
        product = model_to_dict(products[i])
        product["image"] = products[i].image.url
        productsJson.append(product)
    
    return HttpResponse(json.dumps(productsJson))


def getProduct(request, category, color):
    products = list(Product.objects.filter(category=category))
    
    productsJson = []
    for i in range(len(products)):
        product = model_to_dict(products[i])
        product["image"] = products[i].image.url
        productsJson.append(product)
        
    for i in range(len(products)):
        if productsJson[i]["id"] == int(color):
            productsJson = productsJson[i::] + productsJson[0: i]
        
    productsJson = productsJson * 4
    productsJson = productsJson[0:4]
    
    return HttpResponse(json.dumps(productsJson))
        
        
    
    