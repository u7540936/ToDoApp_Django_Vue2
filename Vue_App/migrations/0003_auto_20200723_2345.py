# Generated by Django 3.0.8 on 2020-07-24 03:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Vue_App', '0002_auto_20200722_1343'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todolist',
            name='CompletedOn',
            field=models.DateTimeField(blank=True),
        ),
        migrations.AlterField(
            model_name='todolist',
            name='DeletedOn',
            field=models.DateTimeField(blank=True),
        ),
    ]
