# Generated by Django 4.2.7 on 2023-12-05 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0005_alter_customuser_adress_alter_customuser_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='adress',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='phone',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
