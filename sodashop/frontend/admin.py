from django.contrib import admin
from .models import *


@admin.register(PopularProduct)
class PopularProductAdmin(admin.ModelAdmin):
    list_display = ['product', 'code']
    list_editable = ['product', 'code']
    list_display_links = None

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'price', 'user', 'date', "comment", "state"]
    list_editable = ['price', 'user', 'date', "comment", "state"]
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
    list_display = ["price", "name", "description", "image", "gradient", "blob1", "blob2", "category"]
    list_editable = ["price", "name", "description", "image", "gradient", "blob1", "blob2", "category"]
    list_display_links = None
    
@admin.register(CartProduct)
class CartProductAdmin(admin.ModelAdmin):
    list_display = ["order", "quantity"]
    list_editable = ["order", "quantity"]
    list_display_links = None
    
