from django.contrib import admin
from .models import *


@admin.register(PopularProduct)
class PopularProductAdmin(admin.ModelAdmin):
    list_display = [f.name for f in PopularProduct._meta.fields]
    list_display_links = None

@admin.register(Rate)
class RateAdmin(admin.ModelAdmin):
    list_display = [f.name for f in Rate._meta.fields]
    list_display_links = None
    
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = [f.name for f in Category._meta.fields]
    list_editable = [f.name for f in Category._meta.fields if f.name != "id"]
    list_display_links = None
    
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [f.name for f in Product._meta.fields]
    list_editable = [f.name for f in Product._meta.fields if f.name != "id"]
    list_display_links = None
