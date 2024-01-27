from django.db import models


delivery_methods = (("Courier", "Courier"),  ("Pickup", "Pickup"))
payment_methods = (("By cash", "By cash"), ("Bank card", "Bank card"))
order_states = (("At the pick-up point", "At the pick-up point"), ("In the warehouse", "In the warehouse"), ("On the way", "On the way"))
        
class Category(models.Model):
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=50)
    image = models.ImageField(upload_to='product/%Y/%m/%d')
    price = models.IntegerField()
    gradient = models.CharField(max_length=500)
    blob1 = models.CharField(max_length=50)
    blob2 = models.CharField(max_length=50)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name


class PopularProduct(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    code = models.IntegerField()
    
    class Meta:
        ordering = ['-code']

class Rate(models.Model):
    rate = models.IntegerField()
    user = models.ForeignKey("user.CustomUser", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

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
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    