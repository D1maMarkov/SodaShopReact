# Generated by Django 4.2.7 on 2023-11-30 19:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_customuser_name_customuser_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='adress',
            field=models.CharField(max_length=500, null=True),
        ),
    ]
