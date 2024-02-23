from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from frontend.models import PopularProduct, Product
from django.http import HttpResponse, JsonResponse
from django.views.generic import View, CreateView
from django.conf import settings
from cart.cart import Cart
from ..serializer import *
from ..forms import *
import telebot
import json


bot = telebot.TeleBot(settings.TELEGRAM_API_TOKEN)

class GetOrders(View):
    def get(self, request):
        orders = Order.objects.filter(user=request.user)
        orders_json = OrderSerializer(orders, many=True).data
        
        return HttpResponse(json.dumps(orders_json))

@method_decorator(csrf_exempt, name='dispatch')
class CreateOrder(CreateView):
    form_class = OrderForm

    def form_valid(self, form):
        cart = Cart(self.request)
        user = self.request.user

        order = Order.objects.create(
            price=cart.get_total_price(), 
            user=user, 
            delivery=form.cleaned_data["delivery"],
            payment=form.cleaned_data["payment"],
            comment=form.cleaned_data["comment"],
            adress=form.cleaned_data["adress"],
        )

        message = "На сайте новый заказ"
        bot.send_message(settings.MY_TELEGRAM_ID, message)
        
        user.set_name(form.cleaned_data["name"]) 
        user.set_phone(form.cleaned_data["phone"])

        for item in cart:
            product = Product.objects.get(name=item["name"])
            popular_product = PopularProduct.objects.filter(product=product)
            if popular_product.exists():
                popular_product[0].code += item['quantity']
                popular_product[0].save()
            else:
                PopularProduct.objects.create(
                    product=product, 
                    code=item['quantity']
                )

            CartProduct.objects.create(order=order, product=product, quantity=item['quantity'])

        cart.clear()

        return JsonResponse({
            "status": "valid",
        })
        
    def form_invalid(self, form):
        return JsonResponse({
            "status": "invalid",
            'errors': form.errors
        })