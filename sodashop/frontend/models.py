from django.db import models

        
class Category(models.Model):
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=50)
    image = models.ImageField(upload_to='product/%Y/%m/%d')
    price = models.PositiveIntegerField()
    gradient = models.CharField(max_length=500)
    blob1 = models.CharField(max_length=50)
    blob2 = models.CharField(max_length=50)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class PopularProduct(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    code = models.PositiveIntegerField()

    class Meta:
        ordering = ['-code']

class Rate(models.Model):
    rate = models.PositiveSmallIntegerField()
    user = models.ForeignKey("user.CustomUser", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)