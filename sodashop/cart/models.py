from django.db import models


delivery_methods = (
    ("Courier", "Courier"),  
    ("Pickup", "Pickup")
)

payment_methods = (
    ("By cash", "By cash"), 
    ("Bank card", "Bank card")
)

order_states = (
    ("At the pick-up point", "At the pick-up point"), 
    ("In the warehouse", "In the warehouse"), 
    ("On the way", "On the way")
)

class Order(models.Model):
    price = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey("user.CustomUser", on_delete=models.CASCADE)
    delivery = models.CharField(max_length=50, choices=delivery_methods)
    payment = models.CharField(max_length=50, choices=payment_methods)
    comment = models.CharField(max_length=50, null=True, blank=True)
    lat = models.CharField(max_length=50)
    lng = models.CharField(max_length=50)
    state = models.CharField(max_length=50, choices=order_states, default="In the warehouse")

    class Meta:
        ordering = ['-id', '-date']

class CartProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey("frontend.Product", on_delete=models.CASCADE)
    quantity = models.IntegerField()