# Generated by Django 4.2.7 on 2023-12-05 14:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0015_rename_adress_order_lat_order_lng'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='state',
            field=models.CharField(choices=[('At the pick-up point', 'At the pick-up point'), ('in the warehouse', 'in the warehouse'), ('On the way', 'On the way')], max_length=50, null=True),
        ),
    ]