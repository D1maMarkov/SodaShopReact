from django.db import models


deliveryMethods = (("Courier", "Courier"),  ("Pickup", "Pickup"))
paymentMethods = (("By cash", "By cash"), ("Bank card", "Bank card"))

class Category(models.Model):
    name = models.CharField(max_length=50)
    
class Product(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=50)
    price = models.IntegerField()
    image = models.ImageField(upload_to='product/%Y/%m/%d', blank=False, null=True)
    gradient = models.CharField(max_length=500)
    blob1 = models.CharField(max_length=50)
    blob2 = models.CharField(max_length=50)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    
class PopularProduct(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    code = models.IntegerField(null=True)

class Rate(models.Model):
    rate = models.IntegerField(null=True)
    user = models.ForeignKey("user.CustomUser", on_delete=models.CASCADE, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    
class Order(models.Model):
    price = models.IntegerField(null=True)
    user = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    curent_date = models.CharField(max_length=50, null=True)
    user = models.ForeignKey("user.CustomUser", on_delete=models.CASCADE, null=True)
    delivery = models.CharField(max_length=50, null=True, choices=deliveryMethods)
    payment = models.CharField(max_length=50, null=True, choices=paymentMethods)
    comment = models.CharField(max_length=50, null=True)
    lat = models.CharField(max_length = 500, null=True)
    lng = models.CharField(max_length = 500, null=True)
    
class CartProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    quantity = models.IntegerField(null=True)
    
