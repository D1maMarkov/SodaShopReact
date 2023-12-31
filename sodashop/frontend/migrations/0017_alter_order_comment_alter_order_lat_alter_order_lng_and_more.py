# Generated by Django 4.2.7 on 2023-12-05 17:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0005_alter_customuser_adress_alter_customuser_name_and_more'),
        ('frontend', '0016_order_state'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='comment',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='lat',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='lng',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='price',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='order',
            name='state',
            field=models.CharField(choices=[('At the pick-up point', 'At the pick-up point'), ('In the warehouse', 'In the warehouse'), ('On the way', 'On the way')], max_length=50),
        ),
        migrations.AlterField(
            model_name='order',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.customuser'),
        ),
        migrations.AlterField(
            model_name='popularproduct',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='frontend.product'),
        ),
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='frontend.category'),
        ),
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(upload_to='product/%Y/%m/%d'),
        ),
        migrations.AlterField(
            model_name='rate',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='frontend.product'),
        ),
        migrations.AlterField(
            model_name='rate',
            name='rate',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='rate',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.customuser'),
        ),
    ]
