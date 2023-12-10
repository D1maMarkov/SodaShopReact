# Generated by Django 4.2.7 on 2023-12-10 10:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0009_tokentoconfirmemail'),
        ('frontend', '0022_alter_order_comment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartproduct',
            name='order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='frontend.order'),
        ),
        migrations.AlterField(
            model_name='cartproduct',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='frontend.product'),
        ),
        migrations.AlterField(
            model_name='cartproduct',
            name='quantity',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='order',
            name='comment',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='curent_date',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='order',
            name='delivery',
            field=models.CharField(choices=[('Courier', 'Courier'), ('Pickup', 'Pickup')], max_length=50),
        ),
        migrations.AlterField(
            model_name='order',
            name='lat',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='order',
            name='lng',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='order',
            name='payment',
            field=models.CharField(choices=[('By cash', 'By cash'), ('Bank card', 'Bank card')], max_length=50),
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
            model_name='rate',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='frontend.product'),
        ),
        migrations.AlterField(
            model_name='rate',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.customuser'),
        ),
    ]
