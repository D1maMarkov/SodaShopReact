# Generated by Django 4.2.7 on 2023-12-23 20:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0023_alter_cartproduct_order_alter_cartproduct_product_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='popularproduct',
            options={'ordering': ['code']},
        ),
    ]
