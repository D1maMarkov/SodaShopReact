from django.conf import settings
from cart.cart import Cart
import telebot
from ..serializer import *
from user.models import CustomUser
from django.http import HttpResponse
import json
from frontend.models import PopularProduct


bot = telebot.TeleBot(settings.TELEGRAM_API_TOKEN)

def get_orders(request):
    user = request.user
    current_user = CustomUser.objects.get(user=user)

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