from django.contrib import admin

from .models.models import CartProduct, Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = [f.name for f in Order._meta.fields]
    list_display_links = None


@admin.register(CartProduct)
class CartProductAdmin(admin.ModelAdmin):
    list_display = [f.name for f in CartProduct._meta.fields]
    list_editable = [f.name for f in CartProduct._meta.fields if f.name != "id"]
    list_display_links = None
