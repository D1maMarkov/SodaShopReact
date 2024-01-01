# Generated by Django 4.2.7 on 2023-12-23 21:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0026_rename_curent_date_order_date'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='order',
            options={'ordering': ['id', '-date']},
        ),
        migrations.AlterField(
            model_name='order',
            name='state',
            field=models.CharField(choices=[('At the pick-up point', 'At the pick-up point'), ('In the warehouse', 'In the warehouse'), ('On the way', 'On the way')], default='In the warehouse', max_length=50),
        ),
    ]