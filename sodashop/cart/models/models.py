from django.db import models
from .enums import *


class Order(models.Model):
    price = models.PositiveIntegerField()
    date = models.DateField(auto_now_add=True, null=True)
    user = models.ForeignKey("user.CustomUser", on_delete=models.CASCADE)
    delivery = models.CharField(max_length=50, choices=Delivers.choices())
    payment = models.CharField(max_length=50, choices=Payments.choices())
    comment = models.CharField(max_length=50, null=True, blank=True)
    adress = models.CharField(max_length=255)
    state = models.CharField(max_length=50, choices=OrderStates.choices(), default=OrderStates.warehouse.value)

    class Meta:
        ordering = ['-id', '-date']

class CartProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey("frontend.Product", on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()