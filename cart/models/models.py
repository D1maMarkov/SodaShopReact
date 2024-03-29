from django.db import models

from .enums import Delivers, OrderStates, Payments


class Order(models.Model):
    price = models.PositiveIntegerField()
    date = models.DateField(auto_now_add=True, null=True)
    user = models.ForeignKey("user.CustomUser", on_delete=models.CASCADE)
    delivery = models.CharField(max_length=50, choices=Delivers.choices())
    payment = models.CharField(max_length=50, choices=Payments.choices())
    comment = models.CharField(max_length=50, null=True, blank=True)
    adress = models.CharField(max_length=255)
    state = models.CharField(max_length=50, choices=OrderStates.choices(), default=OrderStates.warehouse)

    class Meta:
        ordering = ["-id", "-date"]


class CartProduct(models.Model):
    order = models.ForeignKey(Order, related_name="order_products", on_delete=models.CASCADE)
    product = models.ForeignKey("frontend.Product", on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
