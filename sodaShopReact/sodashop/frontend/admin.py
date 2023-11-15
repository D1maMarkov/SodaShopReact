from django.contrib import admin
from .models import *


@admin.register(PopularProduct)
class PopularProductAdmin(admin.ModelAdmin):
    list_display = ['product', 'code']
    list_editable = ['product', 'code']
    list_display_links = None

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['price', 'user', "delivery", "payment", "lat", "lng", 'curent_date', "comment"]
    list_editable = ['price', 'user', "delivery", "payment", "lat", "lng", 'curent_date', "comment"]
    list_display_links = None

@admin.register(Rate)
class RateAdmin(admin.ModelAdmin):
    list_display = ['product', 'rate', 'user']
    list_editable = ['product', 'rate', 'user']
    list_display_links = None
    
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']
    list_editable = ['name']
    list_display_links = None
    
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "description", "price", "image", "gradient", "blob1", "blob2", "category"]
    list_editable = ["name", "description", "price", "image", "gradient", "blob1", "blob2", "category"]
    list_display_links = None
    
@admin.register(CartProduct)
class CartProductAdmin(admin.ModelAdmin):
    list_display = ["order", "product", "quantity"]
    list_editable = ["order", "product", "quantity"]
    list_display_links = None
    
