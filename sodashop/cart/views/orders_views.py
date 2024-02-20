from user.models.custum_user_model import CustomUser
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import HttpResponse, JsonResponse
from frontend.models import PopularProduct
from django.views.generic import View
from frontend.models import Product
from django.conf import settings
from cart.cart import Cart
from ..serializer import *
from ..forms import *
import telebot
import json


bot = telebot.TeleBot(settings.TELEGRAM_API_TOKEN)

class GetOrders(View):
    def get(self, request):
        user = request.user
        current_user = CustomUser.objects.get(user=user)

        orders = Order.objects.filter(user=current_user)
        orders_json = OrderSerializer(orders, many=True).data
        
        return HttpResponse(json.dumps(orders_json))

@method_decorator(csrf_exempt, name='dispatch')
class CreateOrder(View):
    def post(self, request):
        form = OrderForm(request.POST)

        if form.is_valid():
            cart = Cart(request)

            order = Order.objects.create(
                price=cart.get_total_price(), 
                user=CustomUser.objects.get(user=request.user), 
                delivery=form.cleaned_data["delivery"],
                payment=form.cleaned_data["payment"],
                comment=form.cleaned_data["comment"],
                adress=form.cleaned_data["adress"],
            )

            message = "На сайте новый заказ"
            #bot.send_message(settings.MY_TELEGRAM_ID, message)
            
            CustomUser.objects.filter(user=request.user).update(
                name=form.cleaned_data["name"], 
                phone=form.cleaned_data["phone"]
            )

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

        else:        
            return JsonResponse({
                "status": "invalid",
                'errors': form.errors
            })