# Generated by Django 4.2.7 on 2023-12-05 17:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0006_alter_customuser_adress_alter_customuser_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='adress',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='verification_code',
            field=models.IntegerField(blank=True),
        ),
    ]
