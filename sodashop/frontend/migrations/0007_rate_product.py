# Generated by Django 4.2 on 2023-10-09 12:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0006_remove_rate_name_alter_popularproduct_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='rate',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='frontend.product'),
        ),
    ]
